const express = require('express');
const app = express();
const path = require('path');
const { CONFIG } =  require('./Config');
const redis = require('redis');
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

REDIS.on('connect', function() {
    console.log('connected redis server' + CONFIG.SERVER.REDIS.HOST);
});
REDIS.on("error", function(err) {
    console.error("Error connecting to redis", err);
});
// client.set("email", email, function (err, reply){
//     console.log("set redis email : " + email);
// });
// client.get("email", function (err, reply) {
//     console.log("reply.toString()" + reply.toString());
// });
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
    var userModel = require("./Model/User.js");
    var tokenRefeshModel = require("./Model/TokenRefesh.js");
    var { email , password , client } = req.body;
    var error = null;
    if(!email || !password ){
        error = { message : "sai tên đăng nhập hoặc mật khẩu", backend : "email or password fail" , code: 403 };
    }else
    var _user = await userModel.checkLogin( email , password );
    if( !error && !_user ){
        error = { message : "sai tên đăng nhập hoặc mật khẩu", backend : "email or password fail" , code: 403 };
    }
    if( !error ){
        /// save database sequelize 1 refesh token
        var insertTokenRefesh = await tokenRefeshModel.insertTokenRefesh(_user , client);
        if( insertTokenRefesh.code && insertTokenRefesh.code == 200 ){
            ///render token access
            var access = require("./Model/TokenAccess.js")(_user);
            var setAccess = await REDIS.set( email , access , 'EX', 20 * 60  );
            if( !setAccess ){
                error = { user_message : "xác thực không thành công" , internal_message : "không thể tạo refesh token" , code : 400 };
            }
        }else{
            error = insertTokenRefesh;
        }
    }
    if(!error){
        var data_success = {
            email : _user.email, 
            token_access : access,
            token_refesh : insertTokenRefesh.data.token
        }
        var success = { user_message : "đăng nhập thành công", internal_message : "login true" , code: 200 , data : data_success };
        return res.end(JSON.stringify(success));
    }
    return res.end(JSON.stringify(error));
});
app.post('/api/get-data-have-login', async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    var userModel = require("./Model/User.js");
    var tokenRefeshModel = require("./Model/TokenRefesh.js");
    var { email , token_access, token_refesh , client  } = req.body;
    var error = null;
    console.log("getAccess2" );
    var hung = await REDIS.get(email, function (err, reply) {
        console.log("reply2");
        console.log(reply);
    });
    console.log("reply1" + hung);
    return res.end(JSON.stringify({ user_message : "đăng nhập thành công", internal_message : "login true" , code: 200 }));
});
app.get('*', (req, res)=>{ res.render("index") });
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


