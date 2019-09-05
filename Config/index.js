const CONFIG = {
    SERVER : {
        PORT : 2000,
        DOMAIN : "localhost",
        PROTOCOL: "http://",
        REDIS : {
            HOST : "45.32.116.12",
            PORT : "6379"
        }
    }, 
    database : {
        username: 'postgres',
        password: 'admin123',
        database_name: 'hospital',
        host: "127.0.0.1",
        dialect: 'postgres',
        logging : true
    }
};
module.exports.CONFIG = CONFIG;