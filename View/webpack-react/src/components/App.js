import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from "react-redux";
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';
import ClientLoginPage from './client/Login.jsx';
import ForgotPassword from "./client/ForgotPassword.jsx"
import ClientAboutPage from "./client/AboutPage.jsx"
import PlayNow from "./client/PlayNow.jsx"
import ClientRegisterPage from './client/Register.jsx';
///

class App extends Component {
    render() {
        console.log(this.props.information)
        return (
            <div className="AppComponent">
                <BrowserRouter>
                    <Route exact path="/" render={ ( ) => <ClientHomePage /> } />
                    <Route path="/play-now" render={ ( ) => <PlayNow /> }/>
                    <Route path="/friend" render={ ( ) => <ClientAboutPage />}/>
                    <Route path="/login" render={ () => <ClientLoginPage /> }/>
                    <Route path="/register" render={ () => <ClientRegisterPage /> }/>
                    <Route path="/forgot-password" render={()=> <ForgotPassword /> } />
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        information : state.information_client
    }
}
export default connect(mapStateToProps)(App)