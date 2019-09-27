const DOMAIN = 'localhost';
const DOMAIN_SERVER = "http://"+DOMAIN+":8081/";
const CONFIG = {
    ASSET : '/',
    SITE : {
        name : "HUNGTT",
        owner : "Trương Thanh Hùng",
        title : '',
        address : '',
        version : '0.1.0',
        contact : 'thanhhung.tud@gmail.com'
    },
    SERVER : {
        domain : DOMAIN_SERVER,
        title : 'Hospital'
    },
    PHP : {},
    LANGUAGE : {},
    API : {
        MenuBlog : {
            url : DOMAIN_SERVER + "api/menu-blog",
            method : "GET"
        },
        Login : {
            url : DOMAIN_SERVER + "api/login",
            method : "POST"
        },
        Refesh : {
            url : DOMAIN_SERVER + "api/refesh",
            method : "POST"
        },
        Register : {
            url : DOMAIN_SERVER + "api/register",
            method : "POST"
        }
    }
}
export default CONFIG;