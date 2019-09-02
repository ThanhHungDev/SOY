import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from "react-redux";
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';
import ClientLoginPage from './client/Login.jsx';
import ForgotPassword from "./client/ForgotPassword.jsx"
import ClientAboutPage from "./client/AboutPage.jsx"
///
import { Dropdown } from "../actions";

class App extends Component {
    componentDidMount(){
        this.props.dispatch(Dropdown({}));
    }
    render() {
        return (
            <div className="AppComponent">
                <BrowserRouter>
                    <Route key="home" exact path="/" render={ ( ) => <ClientHomePage /> } />
                    <Route key="about" path="/about" render={ ( ) => <ClientAboutPage />}/>
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
        is_click_dropdown: state.is_click_dropdown,
        information : state.information_client
    }
}
export default connect(mapStateToProps)(App)