module.exports = {
    validateLogin( req , res , next ){
        var validator = require('validator');
        var error = [];
        if(!req.body.email || !validator.isEmail(req.body.email)){
            error.push({ code : 404, message : "email không đúng định dạng" });
        }
        if( !req.body.password || req.body.password.length < 4 ){
            error.push({ code : 404, message : "password không đúng định dạng" });
        }
        if(!error.length){
            next();
        }else {
            res.send(error);
        }
    }
}