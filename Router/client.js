const HomeController = require("../Controller/Client/HomeController");
const CheckLoginMiddleware = require("../Middleware/checkLogin.js");
module.exports = (app, data ) => {
    app.get('/' , (req , res ) => { res.render("index") });
    app.get('/login', (req , res) => {HomeController.get_login(req , res)});
    app.post("/login", (req , res , next ) => {
        CheckLoginMiddleware.validateLogin(req , res , next);
    }, (req , res ) => {
        HomeController.post_login(req , res);
    });
}
