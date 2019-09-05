var Sequelize = require("sequelize");
const sequelize_connect = require("../Model/index.js");
const USER = sequelize_connect.define('USER', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    email: { 
        type: Sequelize.STRING
    }, 
    create_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
},{
    timestamps: false,
    tableName: "user_accounts",
});
const checkLogin = async function( _email , _password ){
    var result = await USER.findAll({ where: { email : _email , password : _password } });
    if(result.length){
        return result[0];
    }
    return false;
}
module.exports = {
    Model : USER , 
    checkLogin : checkLogin
};
