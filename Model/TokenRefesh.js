var Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const salt = 10;
const sequelize = require("../Model/index.js");
const TOKEN_REFESH = sequelize.define('TOKEN_REFESH', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: Sequelize.BIGINT, allowNull: false },
    token_refesh: { type: Sequelize.STRING(255), allowNull: false },
    browser: { type: Sequelize.STRING(64) },
    browser_version: { type: Sequelize.STRING(64) },
    browser_major_version: { type: Sequelize.STRING(64) },
    os: { type: Sequelize.STRING(64) },
    os_version: { type: Sequelize.STRING(64) },
    cookies: { type: Sequelize.BOOLEAN },
    mobile: { type: Sequelize.BOOLEAN },
    create_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    timestamps: false,
    tableName: "token_refesh",
});
const insertTokenRefesh = async function (_user, _client) {
    var error = null;
    if( !_client ){
        error = { user_message : "phương thức sác thực không đúng" , internal_message : "lỗi không có client obj" , code : 400 };
        return error;
    }
    if( !error ){
        var client  = {
            browser: _client.browser,
            browser_version: _client.browser_version,
            browser_major_version: _client.browser_major_version,
            os: _client.os,
            os_version: _client.os_version,
            cookies: _client.cookies,
            mobile: _client.mobile
        };
        var refesh = bcrypt.hashSync( _user.email + JSON.stringify(client) , salt );
        var tokenRefeshCreate = {
            user_id: _user.id,
            token_refesh: refesh
        }
        tokenRefeshCreate = { ... tokenRefeshCreate , ...client };
        var data  = await TOKEN_REFESH.build(tokenRefeshCreate).save().then(newRefesh => {
            var success = { code : 200 , data : { token : refesh } };
            return success;
        }).catch(error => {
            return error = { user_message : "xác thực không thành công" , internal_message : error.message , code : 400 };
        });
        return data;
    }
    return error;
}
module.exports = {
    Model: TOKEN_REFESH,
    insertTokenRefesh: insertTokenRefesh
};
// 
// 
// console.log(hash);
// console.log("hash-");
// new data
// var newData = {
//     email: ‘usertest@gmail.com’,
// firstname: ‘ishi’,
// lastname: ‘kudo’,
//     };

// M_USER.findOne({
//     where: { user_id: 1 }
// }).then(function (row) {
//     // ——– UPDATE M_USER ——–
//     if (row) {
//         row.update(newData).then(function (row) {
//             // update success
//         }).catch(function (error) {
//             // error
//         });
//     }

//     // ——– INSERT M_USER ——–
//     else {
//         var itemAttach = M_USER.build(newData);
//         itemAttach.save().then(function (row) {
//             // insert success
//         }).catch(function (error) {
//             // error
//         });
//     }
// }).catch(function (error) {
//     // error
// });