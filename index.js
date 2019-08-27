const express = require('express');
const app = express();
const path = require('path');
const { CONFIG } =  require('./Config');
/***
 * nodejs allow origin localhost http://localhost:8081
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
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
server.listen(CONFIG.SERVER.PORT, CONFIG.SERVER.DOMAIN ,  () => {
    console.log(`server listen: ${server.address().address}:${ server.address().port}`);
});
/////////////////////////////////////////////////////////////////////////
io.on('connection', function (socket) {
    ///duy nhất chính client đã kết nối được gọi....
    socket.emit('id_socket', socket.id);
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
const Router = require('./Router');
Router(app, null);
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


