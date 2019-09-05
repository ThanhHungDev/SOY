var Sequelize = require("sequelize");

const sequelize = require("../Model/index.js");
const TOKEN_REFESH = sequelize.define('TOKEN_REFESH', {
    id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: Sequelize.BIGINT, allowNull: null },
    token_refesh: { type: Sequelize.STRING },
    browser: { type: Sequelize.STRING },
    browser_version: { type: Sequelize.STRING },
    browser_major_version: { type: Sequelize.STRING },
    cookies: { type: Sequelize.STRING },
    mobile: { type: Sequelize.STRING },
    os: { type: Sequelize.STRING },
    os_version: { type: Sequelize.STRING },
    create_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    timestamps: false,
    tableName: "token_refesh",
});
const insertTokenRefesh = async function (_user_id, _client) {

}
module.exports = {
    Model: TOKEN_REFESH,
    insertTokenRefesh: insertTokenRefesh
};
// const salt = 10;
// var hash = bcrypt.hashSync(_password, salt);
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