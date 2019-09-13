const renderKeyRedis = function ( _id , client ){
    var key_obj = { id : _id , ... client }
    return JSON.stringify(key_obj);
}
const redisGetPromise = ( _key_redis , _REDIS ) => {
    return new Promise(function(resolve, reject) {
        _REDIS.get( _key_redis, (err , value ) => {
            if(err){
                reject(err);
            }else {
                resolve(value);
            }
        });
    });
}
const checkAuthentication = function( check_REDIS, id , access , client , validator){
    if( !check_REDIS ){
        return false;
    }
    var check_input = true;
    if(!id || !access || !client ){
        check_input = false;
    }else if(!validator.isNumeric(id + "")){
        check_input = false;
    }else if(
        !client.browser ||
        !client.browser_version ||
        !client.browser_major_version ||
        !client.os ||
        !client.os_version
    ){check_input = false;}
    if( check_input && access == check_REDIS ){
        return true;
    }
    return false;
}
/**
 * key : name channel
 * REdis là thông tin kết nối redis
 * io.sockets = io.sockets để lấy tất cả user trong 1 phòng chat ra so sánh 
 * xem có nên đưa socket mới vào channel này không
 * hàm này nhận vào key + REDIS dùng để  lấy object trong database redis ra 
 * sau đó kiểm tra tính đúng đắn của channel để trả ra obj tương ứng
 */
const redisHGetAllObjectByKeySync = function( key , _REDIS , io , user_id){
    return new Promise( ( resolve , reject ) => {
        _REDIS.hgetall(key, function(err, object) {
            if(err){
                reject({ key , can : false , duplicate : false });
            }else {
                var detect_room = io.sockets.adapter.rooms[key];
                var number_socketid_in_room = 0;
                if(detect_room)
                    number_socketid_in_room = detect_room.length;
                if( parseInt(number_socketid_in_room) < parseInt (object.max) ){
                    resolve ({ key , can : true , duplicate : false });
                }else if( number_socketid_in_room >= parseInt (object.max) ){
                    /// nếu 1 user nào đó đăng nhập trên nhiều thiết bị
                    /// khi đó user đó mà ở trong channel/room rồi 
                    /// thì ta nên return đúng channel/room đã login từ trước
                    var list_socketid_in_room = io.sockets.adapter.rooms[key].sockets;
                    for (var socketid in list_socketid_in_room ) { 
                        var client_socket = io.sockets.connected[socketid];
                        if(client_socket.user_infor.id == user_id){
                            resolve ({ key , can : false, duplicate : true });
                            break;
                        }
                    }
                }
                resolve ({ key , can : false, duplicate : false });
            }
        });
    });
}
const redisGetListChannelKey = function( _REDIS ){
    return new Promise(function(resolve, reject) {
        _REDIS.keys('channel_*_', (err, keys) => {
            if (err) {
                reject(err);
            }else {
                resolve( keys );
            }
        });   
    });
}
const getListChannelObjectByLstKey = function( keys , _REDIS , global_socket ,user_id){
    return Promise.all(keys.map( 
        key => redisHGetAllObjectByKeySync( key , _REDIS , global_socket , user_id)
    ));
}
const findChannel = function ( list_channel , create = null ) {
    var { REDIS, id } = create , channel = null;
    var listTrue = list_channel.filter( item => item.can );
    if(listTrue.length){
        var list_duplicate = listTrue.filter( item => item.duplicate )
        if(list_duplicate.length){
            channel = list_duplicate[0].key;
        }
        channel = listTrue[0].key;
    }
    if(!channel){
        /// create new channel same : channel__*_
        channel = 'channel__'+id+'_';
        REDIS.hmset(channel , { "max" : 5 , "min" : 3 });
    }
    return channel;
}
module.exports = {
    renderKeyRedis,
    checkAuthentication,
    findChannel,
    redisGetPromise,
    redisGetListChannelKey,
    getListChannelObjectByLstKey
}