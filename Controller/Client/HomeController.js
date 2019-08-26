module.exports = {
    get_login(req , res ) {
        res.render("index");
    },
    post_login( req  , res ) {
        ///check postgress
        var email = 'jbtruongthanhhung@gmail.com';
        const USER = require("../../Model/User.js");
        USER.findAll({where: { email }}).then(function(result) {
            var rs = [];
            for(var i = 0; i < result.length; i++){
                rs.push({id : result[i].id , email : result[i].email});
            }
            res.send(rs);
        }).catch(function (err) {
            console.log('có lỗi' , err);
            return "eror";
        });
    }
}