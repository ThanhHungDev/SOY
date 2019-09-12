const renderKeyRedis = function ( _id , client ){
    var key_obj = { id : _id , ... client }
    return JSON.stringify(key_obj);
}
const redisGetPromise = ( _key_redis , _REDIS ) => {
    return new Promise(function(resolve, reject) {
        _REDIS.get( _key_redis, (err , value ) => {
            if(err){
                return reject(false);
            }
            return resolve(value);
        });
    });
}
const connectRedisCheckAccess = async function (_REDIS ,  id , access , client ){
    console.log("checkAuthentication 3 in")
    var key_redis = renderKeyRedis( id , client );
    var value_redis = await redisGetPromise( key_redis , _REDIS );
    if( !value_redis ){
        console.log("checkAuthentication 3 in false");
        return false;
    }
    console.log("checkAuthentication 4 in");
    if(access != value_redis ){
        console.log("checkAuthentication 5 in");
        return false;
    }
    console.log("checkAuthentication 6 in");
    return true;
}
const checkAuthentication = async function( _REDIS, id , access , client){
    console.log("checkAuthentication begin 1")
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
    console.log("checkAuthentication begin 2")
    connectRedisCheckAccess(_REDIS ,  id , access , client).then(check_REDIS => {
        console.log("checkAuthentication 7 after")
        if( check_input && check_REDIS ){
            console.log("checkAuthentication 8 after")
            return true;
        }
        console.log("checkAuthentication 9 after")
        return false
    });
}
const findChannel = async function ( _REDIS ) {
    _REDIS.keys('channel_*_', async (err, keys) => {
        console.log("VAO TRONG LIST KEYS");
        if (err) {
            return false;
        }else {
            var listPromiseCanAprovedChannel = keys.map( async key => {
                await _REDIS.hgetall(key, function(err, object) {
                    if(err){
                        return { key , can : false };
                    }else {
                        if(object.people < object.max){
                            return { key , can : true };
                        }
                        return { key , can : false };
                    }
                });
            });
            var listCanAprovedChannel = await Promise.all(listPromiseCanAprovedChannel);
            return listCanAprovedChannel;
        }
    });   
}
module.exports = {
    renderKeyRedis,
    connectRedisCheckAccess,
    checkAuthentication,
    findChannel
}