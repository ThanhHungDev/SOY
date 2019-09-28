import React, { Component } from "react";
import { Link } from "react-router-dom"
import Address from "../../icon/svg/address.jsx";
import Phone from "../../icon/svg/phone.jsx";
import Email from "../../icon/svg/email.jsx";
import Facebook from "../../icon/svg/facebook.jsx";
import Youtube from "../../icon/svg/youtube.jsx";
import Instagram from "../../icon/svg/instagram.jsx";
import "../../styles/client/Footer.css"
import CONFIG from "../../config";
class Footer extends Component {
    render() {
        const LOGO = {
            URL: CONFIG.SERVER.domain + "logo/footer-logo.png",
            ALT: CONFIG.SERVER.title
        }
        return (
            <div className="FooterComponent bg-unique-color-dark text-white px-5 px-xs-2 pt-5">
                <div className="container">
                    <div className="border-top border-brown pb-5"></div>
                    <div className="row">
                        <div className="col-3 col-lg-12 col-sm-12 text-center-mobile pb-4">
                            <Link className="LogoFooter" to="/">
                                <img src={LOGO.URL} alt={LOGO.ALT} />
                            </Link>
                        </div>
                        <div className="col-4 col-lg-6 col-sm-12">
                            <div className="FooterInforcontact">
                            <div className="clear">
                                    <div className="float-left" style={styleAddress}>
                                        <Address />
                                    </div>
                                    <div className="float-left">
                                        <p>520, cách mạng tháng tám</p>
                                        <strong className="text-base font-bold">quận 3 , tp.hcm</strong>
                                    </div>
                                </div>
                                <div className="clear pt-4">
                                    <div className="float-left" style={stylePhone}>
                                        <Phone />
                                    </div>
                                    <div className="float-left">
                                        <h2><a className="text-white text-base font-bold pt-1 d-block" href="tel:079.7581.480">079.7581.480</a></h2>
                                    </div>
                                </div>
                                <div className="clear pt-4">
                                    <div className="float-left" style={styleEmail}>
                                        <Email />
                                    </div>
                                    <div className="float-left">
                                        <h2><a className="text-default text-base font-bold pt-1 pb-5 d-block" href="mail:thanhhung.dev@gmail.com">thanhhung.dev@gmail.com</a></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 col-lg-6 col-sm-12 text-center-mobile">
                            <h2 className="text-default font-bold text-xl capitalize">werewolf online</h2>
                            <div className="pt-3 text-light">
                                Chúng tôi muốn cộng đồng gamer ma sói sẽ được phát triển mạnh hơn, 
                                cũng như sử dụng công nghệ để chia sẽ những cảm xúc khi chơi game ma sói cùng bạn bè!!!
                            </div>
                            <div className="pt-4">
                                <a style={socialIcon} href="https://www.facebook.com/HungSmurf">
                                    <Facebook />
                                </a>
                                <a style={socialIcon} href="https://www.facebook.com/HungSmurf">
                                    <Youtube />
                                </a>
                                <a style={socialIcon} href="https://www.facebook.com/HungSmurf">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
var styleAddress = {
    width : '42px',
    height : '42px',
    paddingTop: '8px'
}
var stylePhone = {
    width : '26px',
    height : '26px',
    marginRight: '17px'
}
var styleEmail = {
    width : '26px',
    height : '26px',
    marginRight: '17px'
}
var socialIcon = {
    color : 'white',
    paddingLeft : '20px'
}
export default Footer;