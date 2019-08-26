var Sequelize = require("sequelize");
const sequelize_connect = require("../Model/index.js");
const USER = sequelize_connect.define('USER', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    email: { 
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "format email không đúng",
            }, 
        }, 
    }, 
    create_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
},{
    timestamps: false,
    tableName: "user_accounts",
});
module.exports = USER;
