import React, { Component } from 'react'
import { Link } from 'react-router-dom';
/**
 * import define
 */
import CONFIG from "../../config";
import "./../../styles/client/Register.css"
import IconEmail from "../../icon/svg/email.jsx";
import IconPassword from "../../icon/svg/password.jsx";
import IconName from "../../icon/svg/name.jsx";
import AlertDanger from "../genneral/AlertDanger.jsx";
import ProgressBar from "../genneral/ProgressBar.jsx"
import AlertSuccess from "../genneral/AlertSuccess.jsx";
class Register extends Component {
    constructor(props){
        super(props);
        this.state = { alert : false , progress : false , success : false}
    }
    submitRegister = e => {
        this.setState({alert : false , progress : true}, ()=>{
            var email = this.refs.email.value;
            this.refs.email.value = "";
            var password = this.refs.password.value;
            this.refs.password.value = "";
            var name = this.refs.name.value;
            this.refs.name.value = "";
            fetch(CONFIG.SERVER.domain + "/api/register", {
                method: "POST",
                dataType: "JSON",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email , password , name})
            }).then(resp => {
                return resp.json();
            }).then(data => {
                if(data.code == 200){
                    this.setState({success : data.user_message ,  progress : false });
                }else {
                    this.setState({ alert : data.user_message , progress : false });
                }
            }).catch(error => {
                this.setState({ alert : "đã có lỗi, vui lòng thử lại sau" , progress : false });
            });
        });
        e.preventDefault();
    }
    render() {
        const LOGO = {
            URL: CONFIG.SERVER.domain + "/logo/logo.png",
            ALT: CONFIG.SERVER.title
        }
        return (
            <div className="ComponentForgotPassword Wrapper-Register ripe-malinka-gradient animated fadeIn">
                <Link to="/" className="d-inline-block animated fast slideInLeft" >
                    <img src={LOGO.URL} alt={LOGO.ALT} />
                </Link>
                <div className="Wrapper-Form-Register animated slideInRight">
                    <form className="Form-Register" onSubmit={this.submitRegister}>
                        <h1 className="Text-Register">Register</h1>
                        { this.state.success && <AlertSuccess message={this.state.success} link={{path : "/login" , text : "go to login"}} /> }
                        { this.state.alert && <AlertDanger message={this.state.alert} /> }
                        <div className="Form-Group">
                            <IconEmail />
                            <input type="text" ref="email" className="Input-Control" placeholder="Email Address" />
                        </div>
                        <div className="Form-Group">
                            <IconPassword />
                            <input name="password" ref="password" type="password" className="Input-Control" placeholder="Password" />
                        </div>
                        <div className="Form-Group">
                            <IconName />
                            <input name="name" ref="name" type="text" className="Input-Control" placeholder="Name" />
                        </div>
                        <button type="submit" className="btn Btn-Register blue-gradient-rgba">
                            Register
                        </button>
                        <div className="Login-Link">
                            Back to <Link to="/login">login</Link> page.
					    </div>
                        { this.state.progress && <div className="Wrapper-Progress"><ProgressBar /></div>}
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;