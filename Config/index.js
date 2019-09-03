const CONFIG = {
    SERVER : {
        PORT : 3000,
        DOMAIN : "localhost",
        PROTOCOL: "http://" 
    }, 
    database : {
        username: 'postgres',
        password: 'admin123',
        database_name: 'hospital',
        host: "127.0.0.1",
        dialect: 'postgres'
    }
};
module.exports.CONFIG = CONFIG;