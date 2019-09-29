import React, { Component } from 'react'
import { Link } from 'react-router-dom';
/**
 * import define
 */
import CONFIG from "../../config";
import "./../../styles/client/ForgotPassword.css"
import IconEmail from "../../icon/svg/email.jsx";
export default class ForgotPassword extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const LOGO = {
            URL: CONFIG.SERVER.domain + "logo/logo-temp.png",
            ALT: CONFIG.SERVER.title
        }
        return (
            <div className="ComponentForgotPassword Wrapper-Forgot-Password ripe-malinka-gradient animated fadeIn">
                <Link to="/" className="d-inline-block animated fast slideInLeft" >
                    <img src={LOGO.URL} alt={LOGO.ALT} />
                </Link>
                <div className="Wrapper-Form-Forgot-Password animated slideInRight">
                    <form className="Form-Forgot-Password">
                        <h1 className="Text-Forgot-Password">Forgot Password</h1>
                        <p className="Text-Description-Forgot-Password">Enter your email address to retrieve your password</p>
                        <div className="Form-Group">
                            <IconEmail />
                            <input type="text" className="Input-Control" 
                            autoCorrect="off" autoCapitalize="none"
                            placeholder="Email Address" />
                        </div>
                        <button type="submit" className="btn Btn-Forgot-Password blue-gradient-rgba">
                            Retrieve Password
                        </button>
                        <div className="Login-Link">
                            Back to <Link to="/login">login</Link> page.
					    </div>
                    </form>
                </div>
            </div>
        )
    }
}
