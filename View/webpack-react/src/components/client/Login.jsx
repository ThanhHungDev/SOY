import React, { Component } from 'react'
import { Link } from 'react-router-dom';

/**
 * import define
 */
import CONFIG from "../../config";
import "./../../styles/client/Login.css"
import IconEmail from "../../icon/svg/email.jsx";
import IconPassword from "../../icon/svg/password.jsx";
export default class Login extends Component {
    constructor(props){
        super(props);
    }
    Login = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        fetch(CONFIG.SERVER.domain + "/api/login", {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email , password})
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => console.log(data))
            .catch(error => {
                console.log(error, "catch the hoop");
            });
    }
    render() {
        const LOGO = {
            URL: CONFIG.SERVER.domain + "/logo/logo.png",
            ALT: CONFIG.SERVER.title
        }
        return (
            <div className="ComponentLogin Wrapper-Login ripe-malinka-gradient animated fadeIn">
                <Link to="/" className="d-inline-block animated fast slideInRight" >
                    <img src={LOGO.URL} alt={LOGO.ALT} />
                </Link>
                <div className="Wrapper-Form-Login animated slideInLeft">
                    <form className="Form-Login">
                        <h1 className="Text-Welcome-Login">Welcome Back</h1>
                        <div className="Form-Group">
                            <IconEmail />
                            <input name="email" ref="email" type="text" className="Input-Control" placeholder="Email Address" />
                        </div>
                        <div className="Form-Group">
                            <IconPassword />
                            <input name="password" ref="password" type="password" className="Input-Control" placeholder="Password Address" />
                        </div>
                        <div className="Forgot-Password">
						    <Link to="/forgot-password">Forgot password?</Link>
					    </div>
                        <button type="button" onClick={this.Login}
                            className="btn Btn-Login blue-gradient-rgba">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
