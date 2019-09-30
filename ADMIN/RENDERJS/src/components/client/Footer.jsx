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
        return (
            <div className="FooterComponent bg-unique-color-dark text-white px-5 px-xs-2 pt-5">
                <div className="container">
                    <div className="row">
                        footer
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;