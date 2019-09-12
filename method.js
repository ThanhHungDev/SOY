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
 * hàm này nhiệm vụ sẽ nhận vào 1 list key, trả ra 1 list data
 */
const redisHGetAllSync = function( key , _REDIS){
    return new Promise( ( resolve , reject ) => {
        _REDIS.hgetall(key, function(err, object) {
            if(err){
                reject({ key , can : false });
            }else { 
                if( parseInt(object.people) < parseInt (object.max) ){
                    resolve ({ key , can : true });
                }
                resolve ({ key , can : false });
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
const getListChannelObjectByLstKey = function( keys , _REDIS ){
    return Promise.all(keys.map( 
        key => redisHGetAllSync( key , _REDIS)
    ));
}
const findChannel = function ( list_channel , create = null ) {
    var { REDIS, id } = create , channel = null;
    var listTrue = list_channel.map(
        item => {
            if( item.can )
                return item.key;
            return false;
        }
    ).filter( item => item );
    if(listTrue.length){
        channel = listTrue[0];
    }
    if(!channel){
        /// create new channel same : channel__*_
        channel = 'channel__'+id+'_';
        REDIS.hmset(channel , { "level" : 1,  "people" : 0,  "max" : 20 , "min" : 10 });
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