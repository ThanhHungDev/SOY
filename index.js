const express = require('express');
const app = express();
const path = require('path');
const validator = require('validator');
const { CONFIG } =  require('./Config');
const redis = require('redis');
const bcrypt = require('bcrypt');
const salt = 5;
var METHOD = require("./method.js")
/***
 * nodejs allow origin localhost *
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/**
 * setting directeries asset root 
 */
app.use("", express.static(path.join(__dirname, 'Public')));
/////////////////////////////////////////////////////////////////////////
// for parsing application/x-www-form-urlencoded/////////////////////////
/////////////////////////////////////////////////////////////////////////
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/////////////////////////////////////////////////////////////////////////
/**
 * thiết lập bộ lắng nghe sự kiện
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(CONFIG.SERVER.PORT,  () => {
    console.log(`server listen: ${server.address().address}:${ server.address().port}`);
});
/////////////////////////////////////////////////////////////////////////
//////connect database redis ////////////////////////////////////////////
const REDIS = redis.createClient(CONFIG.SERVER.REDIS.PORT , CONFIG.SERVER.REDIS.HOST);
REDIS.on('connect', async function() {
    console.log('connected redis server' + CONFIG.SERVER.REDIS.HOST);
});
REDIS.on("error", function(err) {
    console.error("Error connecting to redis", err);
});

/////////////////////////////////////////////////////////////////////////
io.on('connection', function (socket) {
    // console.log(socket.adapter.rooms); cái này khá quan trọng vì hàm này trả ra những room của socket
    console.log("have connect: " + socket.id);
    // /////////////////////////////////////////////////////////////////////
    /**
     * vì cần socket chạy tiến trình song song
     * I. trả về cho client 1 emit authentication_response mang thông tin các user trong 1 phòng
     * 1. xác thực người dùng là 1 promise 
     * 2. tìm kiếm channel tương ứng cũng là 1 promise
     * II. set timeout cho token để nó có thể chat không gián đoạn
     */
    socket.on('authentication', async (data) => {
        /// variable define default
        var response = { status : 204 , message : "server handle authentication" , data : [] };
        /// variable input
        var { id, access } = data.authentication, { client } = data;
        var user_agent = socket.request.headers['user-agent'] ? socket.request.headers['user-agent'] : '' ;
        var client = { ... data.client , user_agent };
        var key_redis = METHOD.renderKeyRedis( id , client );
        /// đăng kí tiến trình 1
        var check_auth = METHOD.redisGetPromise( key_redis , REDIS )
        .then( result => METHOD.checkAuthentication( result , id, access , client , validator))
        .catch(error => false);
        /// đăng kí tiến trình 2
        var get_channel = METHOD.redisGetListChannelKey( REDIS )
        .then(list_key =>  METHOD.getListChannelObjectByLstKey( list_key , REDIS , io , id ))
        .then(list_channel_obj => METHOD.findChannel( list_channel_obj, { REDIS , id : socket.id } ))
        .catch( error => false);
        /// cho 2 tuyến trình chạy cùng lúc thì ta cần đợi
        let auth = await check_auth;
        let channel = await get_channel;
        /// lưu ý: khi auth đúng, mặc định ta luôn có channel đc trả ra nên sẽ join socket id vào channel
        console.log(auth);
        if( auth ){
            socket.join( channel );
            /// set data user cho socket
            socket.user_infor = data.authentication.user_infor;
            socket.channel = channel;
            /// bây giờ mình phải lấy tất cả user trong cùng 1 room/channel?
            var list_user_infor = [];
            /// thông qua mỗi room/channel, mình đều lấy đc list socket id đang onl
            var list_socketid_in_room = io.sockets.adapter.rooms[channel].sockets;
            /// mình dùng thủ thuật để giải quyết bài toán trên bằng hàm : io.sockets.connected[socketid]
            /// loop id in list and connect to socket of id then get infor
            for (var socketid in list_socketid_in_room ) { 
                var client_socket = io.sockets.connected[socketid];
                list_user_infor.push(client_socket.user_infor);
            }
            response.status = 200;
            response.data = [{
                online : list_user_infor,
                channel : channel,
                socket : socket.id
            }];
            io.in(channel).emit( 'authentication_response' , response );
            /// lưu token đó gắn với channel trong 30p để khi 1 user chat 
            /// sẽ gửi thông tin token lên server thì check điều kiện cần là 
            /// token có đang thực sự dùng channel đó không?
            /// điều kiện đủ là token còn thời gian sống không
            REDIS.set( key_redis , access , 'EX', (CONFIG.TimeExpireAccessToken * 60), (err , status ) => {
                if(err){
                    response = { status : 204 , message : "server refesh token fail" , data : [] };
                    io.in(channel).emit( 'server_fail' , response );
                }
                response = { status : 200 , message : "server refesh token ready" , data : [] };
                io.in(channel).emit( 'ready_refesh' , response );
            });
            REDIS.set( access , channel , 'EX', (CONFIG.TimeExpireAccessToken * 60) , (err , status ) => {
                if(err){
                    response = { status : 204 , message : "server refesh token fail" , data : [] };
                    io.in(channel).emit( 'server_fail' , response );
                }
                response = { status : 200 , message : "server refesh channel ready" , data : [] };
                io.in(channel).emit( 'ready_set_channel' , response );
            });
        }else{
            response.status = 403;
            response.auth = data.authentication;
            socket.emit( 'authentication_response' , response );
        }
    })
    socket.on('channel_message', (data) => {
        /// variable define default
        var response = { status : 204 , message : "server handle ChannelMessage" , data : [] };
        /// variable input
        var { id, access , message, channel, user_infor } = data;
        REDIS.get( access, (err , value ) => {
            if(err){
                response.status = 403;
            }else if( value == channel ){
                response.status = 200;
                response.data = { id, message , user_infor};
                io.in(channel).emit( 'channel_message_response' , response );
            }else{
                socket.emit( 'channel_message_response' , response );
            }
        });
    })
    //////////////////////////////////////////////////////////
    socket.on('disconnect', function () {
        console.log('disconnect ' + socket.id)
        socket.leaveAll();
        console.log(socket.adapter.rooms);
    });
});
/////////////////////////////////////////////////////////////////////////
//// router express /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
app.post('/api/login', async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    var UserModel = require("./Model/User.js");
    var TokenRefeshModel = require("./Model/TokenRefesh.js");
    var { email , password , client } = req.body;
    var error = _user = str_client = null;
    var user_agent = req.headers['user-agent'] ? req.headers['user-agent'] : '' ;
    if(!email || !password || !client ){
        error = { 
            user_message : "login fail", 
            internal_message : "block" , 
            code: 403
        };
    }else if(!validator.isEmail(email)){
        error = { 
            user_message : "format email fail", 
            internal_message : "invalid email", 
            code: 400
        };
    }else if(!validator.isLength(password , {min: 6, max: 64} )){
        error = { 
            user_message : "password character number >= 6 and <= 64 ", 
            internal_message : "invalid password", 
            code: 400
        };
    }else if(
        !client.browser ||
        !client.browser_version ||
        !client.browser_major_version ||
        !client.os ||
        !client.os_version
    ){
        error = { 
            user_message : "failure for data", 
            internal_message : "invalid object data", 
            code: 400
        };
    }
    if( !error ){
        var UserExist = await UserModel.findAll({ where: { email } });
        if(UserExist.length){
            var password_in_db = UserExist[0].password;
            var check_password = bcrypt.compareSync( password, password_in_db);
            if( check_password ){
                var temp_user = UserExist[0];
                _user = { 
                    id: temp_user.id, 
                    email : temp_user.email , 
                    mobile : temp_user.mobile , 
                    name : temp_user.name,
                    avatar: temp_user.avatar
                }
            }
        }
    }
    if( !_user ){
        error = { 
            user_message : "email or password fail", 
            internal_message : "email or password fail" , 
            code: 403 
        };
    }
    if( !error ){
        client = { ... client , user_agent };
        var str_client = JSON.stringify(client);
        var isTokenRefeshExist = await TokenRefeshModel.findOne({ where: { user_id : _user.id , client : str_client } });
        if( isTokenRefeshExist){
            var refesh = isTokenRefeshExist.token_refesh;
        }else {
            var refesh = bcrypt.hashSync( JSON.stringify(_user) , salt );
            var tokenRefeshCreate = {
                user_id: _user.id,
                token_refesh: refesh,
                client : str_client
            }
            var is_save_token_refesh = await TokenRefeshModel.build(tokenRefeshCreate).save().then(newRefesh => true ).catch(error => false);
            if( !is_save_token_refesh ){
                error = { 
                    user_message : "authenticate fail", 
                    internal_message : "error create refesh token" , 
                    code : 500 
                };
            }
        }
    }
    if( !error ){
        var access = bcrypt.hashSync( refesh , salt );
        var key_redis = METHOD.renderKeyRedis( _user.id , client );
        REDIS.set( key_redis , access , 'EX', (CONFIG.TimeExpireAccessToken * 60) , (err , status ) => {
            if(err){
                error = { 
                    user_message : "authenticate fail", 
                    internal_message : "error create access token" ,  
                    code : 500 
                };
                return res.end(JSON.stringify(error));
            }
            var data_success = {
                id : _user.id, 
                access, 
                refesh,
                user_infor : _user
            }
            var success = { 
                user_message : "login success", 
                internal_message : "login true" , 
                code: 200 , 
                data : data_success 
            };
            return res.end(JSON.stringify(success));
        });
    }else {
        return res.end(JSON.stringify(error));
    }
});
app.post('/api/refesh', async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    var TokenRefeshModel = require("./Model/TokenRefesh.js");
    var { id, refesh, client } = req.body;
    var error = _user = str_client = null;
    var user_agent = req.headers['user-agent'] ? req.headers['user-agent'] : '' ;
    if(!id || !refesh || !client ){
        error = { 
            user_message : "refesh fail", 
            internal_message : "block" , 
            code: 403
        };
    }else if(!validator.isNumeric(id + "")){
        error = { 
            user_message : "format id fail", 
            internal_message : "invalid id", 
            code: 400
        };
    }else if(
        !client.browser ||
        !client.browser_version ||
        !client.browser_major_version ||
        !client.os ||
        !client.os_version
    ){
        error = { 
            user_message : "failure for data", 
            internal_message : "invalid object data", 
            code: 400
        };
    }
    if( !error ){
        client = { ... client , user_agent };
        var str_client = JSON.stringify(client);
        var isTokenRefeshExist = await TokenRefeshModel.findOne({ where: { user_id : id , client : str_client } });
        if( !isTokenRefeshExist){
            error = { 
                user_message : "authenticate fail", 
                internal_message : "refesh token not found" , 
                code : 500 
            };
        }else{
            var new_refesh = bcrypt.hashSync( isTokenRefeshExist.token_refesh , salt );
            var is_save = await isTokenRefeshExist.update({ token_refesh : new_refesh }).then(newRefesh => true ).catch(error => false );
            if( !is_save ){
                error = { 
                    user_message : "authenticate fail", 
                    internal_message : "error update refesh token" , 
                    code : 500 
                };
            }
        }
    }
    if( !error ){
        var access = bcrypt.hashSync( refesh , salt );
        var key_redis = METHOD.renderKeyRedis( id , client );
        REDIS.set( key_redis , access , 'EX', (CONFIG.TimeExpireAccessToken * 60) , (err , status ) => {
            if(err){
                error = { 
                    user_message : "refesh fail", 
                    internal_message : "error create access token",
                    code : 500 
                };
                return res.end(JSON.stringify(error));
            }
            var data_success = {
                id : id, 
                access,
                refesh : new_refesh
            }
            var success = { 
                user_message : "login success", 
                internal_message : "login true" , 
                code: 200 , 
                data : data_success 
            };
            return res.end(JSON.stringify(success));
        });
    }else {
        return res.end(JSON.stringify(error));
    }
});
app.post('/api/get-data-user', async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    var UserModel = require("./Model/User.js");
    var { id, access, client } = req.body;
    var error = str_client = null;
    var user_agent = req.headers['user-agent'] ? req.headers['user-agent'] : '' ;
    if(!id || !access || !client ){
        error = { 
            user_message : "data fail", 
            internal_message : "block" , 
            code: 403
        };
    }else if(!validator.isNumeric(id + "")){
        error = { 
            user_message : "format id fail", 
            internal_message : "invalid id", 
            code: 400
        };
    }else if(
        !client.browser ||
        !client.browser_version ||
        !client.browser_major_version ||
        !client.os ||
        !client.os_version
    ){
        error = { 
            user_message : "failure for data", 
            internal_message : "invalid object data", 
            code: 400
        };
    }
    if( !error ){
        client = { ...client , user_agent};
        var key_redis = METHOD.renderKeyRedis( id , client );
        REDIS.get( key_redis, async (err , value ) => {
            if(err){
                error = { 
                    user_message : "get access fail", 
                    internal_message : "get access token fail",
                    code : 500 
                };
            }
            if(access != value ){
                error = { 
                    user_message : "token timeout", 
                    internal_message : "token fail",
                    code : 403 
                };
            }
            if( !error ){
                var _user = await UserModel.findOne({ where : {id }}).then(result => result ).catch(error => false);
                // console.log(_user);
                var success = { 
                    user_message : "login success", 
                    internal_message : "login true" , 
                    code: 200 , 
                    data : _user 
                };
                return res.end(JSON.stringify(success));
            }
            return res.end(JSON.stringify(error));
        });
    }else {
        return res.end(JSON.stringify(error));
    }
});
app.post('/api/register', async (req, res )=>{
    var { email, password, confirm, name , mobile } = req.body;
    var error  = null;
    var UserModel = require("./Model/User.js");
    if(!email || !password || !name ){
        error = { 
            user_message : "register fail", 
            internal_message : "block" , 
            code: 400
        };
    }else if(!validator.isLength(password , {min: 6, max: 64} )){
        error = { 
            user_message : "password character number >= 6 and <= 64 ", 
            internal_message : "invalid password", 
            code: 400
        };
    }else if(!validator.isEmail( email )){
        error = { 
            user_message : "email fail", 
            internal_message : "invalid email", 
            code: 400
        };
    }else{
        var findUserByEmail = await UserModel.findOne({where : { email }}).then(result => result ).catch(error => false);
        if(findUserByEmail){
            error = { 
                user_message : "email exist", 
                internal_message : "exist email", 
                code: 400
            };
        }
    }
    if( !error ){
        var hash_password = bcrypt.hashSync( password , salt );
        var new_user = {
            email,
            password : hash_password,
            name
        }
        var is_save_user = await UserModel.build(new_user).save().then(new_record => true ).catch(error => false);
        if( !is_save_user ){
            error = { 
                user_message : "register fail", 
                internal_message : "error register user" , 
                code : 400 
            };
        }
    }
    if( !error ){
        var success = { 
            user_message : "register success", 
            internal_message : "register true" , 
            code: 200 
        };
        return res.end(JSON.stringify(success));
    }else  {
        return res.end(JSON.stringify(error));
    }
});
app.get('*', (req, res)=>{ res.sendFile(path.join(__dirname, 'View/index.html')); });
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////