const DOMAIN = 'ma-soi.online';
const PORT = "";
const IP_VPS = "139.180.209.195";
const PORT_VPS = "8081";
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
        title : 'Hospital',
        ip : IP_VPS,
        port : PORT_VPS
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