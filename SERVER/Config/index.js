const CONFIG = {
    SERVER : {
        PORT : 8888,
        DOMAIN : "localhost",
        PROTOCOL: "http://",
        REDIS : {
            HOST : "127.0.0.1",
            PORT : "6379"
        }
    }, 
    database : {
        username: 'postgres',
        password: 'admin123',
        database_name: 'ma-soi',
        host: "127.0.0.1",
        dialect: 'postgres',
        logging : false
    },
    TimeExpireAccessToken : 2,
};
module.exports.CONFIG = CONFIG;