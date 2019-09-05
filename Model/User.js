var Sequelize = require("sequelize");
const bcrypt = require('bcrypt');

const sequelize_connect = require("../Model/index.js");
const USER = sequelize_connect.define('USER', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    email: { 
        type: Sequelize.STRING,
        unique: { args: true, msg: 'Email address already in use!' }
    }, 
    password : { type: Sequelize.STRING },
    create_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
},{
    timestamps: false,
    tableName: "user_accounts",
});
const checkLogin = async function( _email , _password ){
    var result = await USER.findAll({ where: { email : _email } });
    if(result.length){
        var password_compare = result[0].password;
        var check_password = await bcrypt.compareSync(_password, password_compare);
        return check_password;
    }
    return false;    
}

module.exports = {
    Model : USER , 
    checkLogin : checkLogin
};
// const salt = 10;
// var hash = bcrypt.hashSync(_password, salt);
// console.log(hash);
// console.log("hash-");