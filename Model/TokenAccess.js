const bcrypt = require('bcrypt');
const salt = 4;
module.exports = function renderTokenAccess( _user ){
    _user.password  = "";
    return bcrypt.hashSync( JSON.stringify(_user) , salt );
}