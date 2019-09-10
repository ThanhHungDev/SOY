import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/**
 * import define
 */
import CONFIG from "../../config";
import { actionInitialUser } from "../../actions"
import "./../../styles/client/Login.css"
import IconEmail from "../../icon/svg/email.jsx";
import IconPassword from "../../icon/svg/password.jsx";
import ProgressBar from "../genneral/ProgressBar.jsx"
import AlertDanger from "../genneral/AlertDanger.jsx";
class Login extends Component {
    constructor(props){
        super(props);
        this.state = { alert : false , progress : false , login_success : false }
    }
    Login = e => {
        this.setState({alert : false , progress : true}, ()=>{
            var email = this.refs.email.value;
            var password = this.refs.password.value;
            this.refs.email.value = "";
            this.refs.password.value = "";
            var { client } = this.props;
            fetch(CONFIG.SERVER.domain + "/api/login", {
                method: "POST",
                dataType: "JSON",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email , password , client })
            }).then(resp => {
                return resp.json();
            }).then( response => {
                if(response.code == 200){
                    if (typeof(Storage) !== 'undefined') {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        console.log("đã có dữ liệu của user login từ login component")
                        this.props.dispatch( actionInitialUser(response.data) );
                        this.setState({ login_success : true } );
                    } else {
                        alert('ứng dụng không chạy tốt trên trình duyệt này, vui lòng nâng cấp trình duyệt');
                        this.setState({ alert : response.user_message , progress : false });
                    }
                }else {
                    this.setState({ alert : response.user_message , progress : false });
                }
            }).catch(error => {
                console.log(error.message);
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
        if(this.state.login_success){
            return <Redirect to="/" />;
        }
        return (
            <div className="ComponentLogin Wrapper-Login ripe-malinka-gradient animated fadeIn">
                <Link to="/" className="d-inline-block animated fast slideInRight" >
                    <img src={LOGO.URL} alt={LOGO.ALT} />
                </Link>
                <div className="Wrapper-Form-Login animated slideInLeft">
                    <form className="Form-Login" onSubmit={this.Login}>
                        <h1 className="Text-Welcome-Login">Welcome Back</h1>
                        { this.state.alert && <AlertDanger message={this.state.alert} /> }
                        <div className="Form-Group">
                            <IconEmail />
                            <input name="email" ref="email" type="text" className="Input-Control" placeholder="Email Address" />
                        </div>
                        <div className="Form-Group">
                            <IconPassword />
                            <input name="password" ref="password" type="password" className="Input-Control" placeholder="Password" />
                        </div>
                        <div className="Forgot-Password">
                            <Link to="/forgot-password">Forgot password?</Link>
					    </div>
                        <button type="submit" className="btn Btn-Login blue-gradient-rgba">
                            Log In
                        </button>
                        <div className="Register">
                            Sign in <Link to="/register">Simple Register</Link> instead.
					    </div>
                        { this.state.progress && <div className="Wrapper-Progress"><ProgressBar /></div>}
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return (
        { client : state.client , authentication : state.authentication }
    );
}
export default connect (mapStateToProps)(Login);