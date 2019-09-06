const express = require('express');
const app = express();
const path = require('path');
const validator = require('validator');
const { CONFIG } =  require('./Config');
const redis = require('redis');
const bcrypt = require('bcrypt');
const salt = 5;
/***
 * nodejs allow origin localhost *
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/**
 * setting directeries of view and asset root 
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'View'));
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
// async function setREDIS(_key , _value ){
//     var hung = await REDIS.set(_key, _value, function (err, reply){
//         console.log("hung set 2 : " + reply);
//     });
//     console.log("hung set 1" + hung);
// }
// async function getREDIS(_key ){
//     var hung = await REDIS.get(_key, function (err , reply){
//         console.log("hung get 2 : " + reply);
//     });
//     console.log("hung get 1" + hung);
// }
REDIS.on('connect', async function() {
    console.log('connected redis server' + CONFIG.SERVER.REDIS.HOST);
});
REDIS.on("error", function(err) {
    console.error("Error connecting to redis", err);
});

/////////////////////////////////////////////////////////////////////////
io.on('connection', function (socket) {

    socket.io.emit('FromAPI', socket.id);
    console.log("người kết nối: " + socket.id);
    //////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////
    socket.on('disconnect', function () {
        console.log('có 1 người ngắt kết nối ' + socket.id)
        console.log(socket.adapter.rooms)
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
    // console.log(user_agent)
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
        !client.cookies ||
        !client.mobile ||
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
        // console.log(1);
        var UserExist = await UserModel.findAll({ where: { email } });
        // console.log(2);
        if(UserExist.length){
            var password_in_db = UserExist[0].password;
            // console.log(3);
            var check_password = bcrypt.compareSync( password, password_in_db);
            // console.log(4 + check_password);
            if( check_password ){
                _user = UserExist[0];
            }
        }
        // console.log(5);
    }
    // console.log(6);
    if( !_user ){
        error = { 
            user_message : "email or password fail", 
            internal_message : "email or password fail" , 
            code: 403 
        };
    }
    if( !error ){
        /// đến đây là có user đó thật trong db, nhưng ta vẫn check xem trong bảng refesh token có 
        /// user data tương ứng client chưa
        client = { ... client , user_agent };
        var client_sort = {};
        Object.keys(client).sort().forEach(function(key) {
            client_sort[key] = client[key];
        });
        var str_client = JSON.stringify(client_sort);
        // console.log(str_client);
        // console.log(7);
        /// b1/ query xem có user_id cùng client bị trùng không
        var isTokenRefeshExist = await TokenRefeshModel.findOne({ where: { user_id : _user.id , client : str_client } });
        // console.log(8);
        // console.log(isTokenRefeshExist);
        if( isTokenRefeshExist){
            // console.log(9);
            // console.log(isTokenRefeshExist.token_refesh)
            var refesh = isTokenRefeshExist.token_refesh;
        }else {
            // console.log(10);
            var refesh = bcrypt.hashSync( JSON.stringify(_user) , salt );
            // console.log(11);
            // console.log(refesh);
            var tokenRefeshCreate = {
                user_id: _user.id,
                token_refesh: refesh,
                client : str_client
            }
            var is_save_token_refesh = await TokenRefeshModel.build(tokenRefeshCreate).save().then(newRefesh => true ).catch(error => false);
            // console.log(12 + " " + is_save_token_refesh);
            if( !is_save_token_refesh ){
                error = { 
                    user_message : "authenticate fail", 
                    internal_message : "error create refesh token" , 
                    code : 500 
                };
            }
        }
    }
    // console.log(13);
    if( !error ){
        // console.log(14);
        var access = bcrypt.hashSync( refesh , salt );
        // console.log(15);
        var key_redis = _user.id + client.browser + client.browser_version + client.browser_major_version + client.os + client.os_version;
        REDIS.set( key_redis , access , 'EX', (CONFIG.TimeExpireAccessToken * 60) , (err , status ) => {
            // console.log(16);
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
                token_access : access,
                token_refesh : refesh,
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
        // console.log(17);
        return res.end(JSON.stringify(error));
    }
});
app.post('/api/refesh', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    var UserModel = require("./Model/User.js");
    var TokenRefeshModel = require("./Model/TokenRefesh.js");
    var { id, email, refesh, client } = req.body;
    var error = _user = str_client = null;
    var user_agent = req.headers['user-agent'] ? req.headers['user-agent'] : '' ;
    if(!id || !email || !refesh || !client ){
        error = { 
            user_message : "refesh fail", 
            internal_message : "block" , 
            code: 403
        };
    }else if(!validator.isNumeric(id)){
        error = { 
            user_message : "format id fail", 
            internal_message : "invalid id", 
            code: 400
        };
    }else if(!validator.isEmail(email)){
        error = { 
            user_message : "format email fail", 
            internal_message : "invalid email", 
            code: 400
        };
    }else if(
        !client.browser ||
        !client.browser_version ||
        !client.browser_major_version ||
        !client.cookies ||
        !client.mobile ||
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
        var client_sort = {};
        Object.keys(client).sort().forEach(function(key) {
            client_sort[key] = client[key];
        });
        var str_client = JSON.stringify(client_sort);
        var isTokenRefeshExist = await TokenRefeshModel.findOne({ where: { user_id : id , client : str_client } });
        if( !isTokenRefeshExist){
            error = { 
                user_message : "authenticate fail", 
                internal_message : "refesh token not found" , 
                code : 500 
            };
        }
    }
    if( !error ){
        var access = bcrypt.hashSync( refesh , salt );
        var key_redis = _user.id + client.browser + client.browser_version + client.browser_major_version + client.os + client.os_version;
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
                id : _user.id,
                token_access : access,
                token_refesh : refesh
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
app.get('*', (req, res)=>{ res.render("index") });
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


