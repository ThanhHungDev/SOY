const renderKeyRedis = function ( _id , client ){
    var key_obj = { id : _id , ... client }
    return JSON.stringify(key_obj);
}
const redisGetPromise = ( _key_redis , _REDIS ) => {
    return new Promise(function(resolve, reject) {
        _REDIS.get( _key_redis, (err , value ) => {
            if(err){
                reject(false);
            }
            resolve(value);
        });
    });
}
const checkAuthentication = function( check_REDIS, _REDIS, id , access , client){
    console.log("check  : ");
    console.log(check_REDIS);
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
    console.log(check_input + " " + access + " " +value_redis );
    if( check_input && access == value_redis ){
        return true;
    }
    return false;
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
    checkAuthentication,
    findChannel,
    redisGetPromise
}