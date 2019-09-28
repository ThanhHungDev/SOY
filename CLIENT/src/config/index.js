const DOMAIN = 'ma-soi.online';
const PORT = "";
const DOMAIN_PORT = PORT ? ":"+PORT+"/" : '/';
const DOMAIN_SERVER = "http://"+DOMAIN+DOMAIN_PORT;
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