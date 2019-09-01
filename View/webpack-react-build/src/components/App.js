import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from "react-redux";
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';
import ClientLoginPage from './client/Login.jsx';
import ForgotPassword from "./client/ForgotPassword.jsx"

class App extends Component {
    listenEventDropdown = () => {
        if(this.props.listen_dropdown)
            console.log("hung test giá trị đúng của redux")
        else 
            console.log("hung test giá trị sai của redux")
    }
    render() {
        return (
            <div className="AppComponent" onClick={this.listenEventDropdown}>
                <BrowserRouter>
                    <Route key="home" exact path="/" render={ ( ) => <ClientHomePage /> } />
                    <Route key="about" path="/about" render={ ( ) => <ClientHomePage /> }/>
                    <Route path="/contact" render={ ( ) => (<h2> contact  </h2>) }/>
                    <Route path="/login" render={ () => <ClientLoginPage /> }/>
                    <Route path="/forgot-password" render={()=> <ForgotPassword /> } />
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listen_dropdown: state.dropdown
    }
}
export default connect(mapStateToProps)(App)