///connect database
var Sequelize = require("sequelize");
const { CONFIG } =  require('../Config');
const sequelize = new Sequelize(
    CONFIG.database.database_name, 
    CONFIG.database.username, 
    CONFIG.database.password, 
    {
        host: CONFIG.database.host, 
        dialect: CONFIG.database.dialect,
        logging:  CONFIG.database.logging
    }
);
console.log("new sequelize")
module.exports = sequelize;