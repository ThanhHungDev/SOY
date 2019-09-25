import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';
import ClientLoginPage from './client/Login.jsx';
import ForgotPassword from "./client/ForgotPassword.jsx"
import ClientAboutPage from "./client/AboutPage.jsx"
import PlayNow from "./client/PlayNow.jsx"
import ClientRegisterPage from './client/Register.jsx';
import Developer from "./client/Developer.jsx"
import { actionInitialUser, actionInitialSocketListen } from "../actions"
///
import CONFIG from "../config";

class App extends Component {
    constructor(props){
        super(props);
        const socket = socketIOClient(CONFIG.SERVER.domain);
        this.props.dispatch(actionInitialSocketListen(socket));
        ////
        // console.log("constructor app");
        // localStorage.setItem('user', null)
        if(!this.props.authentication.access || !this.props.authentication.id ){
            if (typeof(Storage) !== 'undefined') {
                var user = JSON.parse(localStorage.getItem('user'));
                if( user && user.id ){
                    // console.log("localStorage user app component" + JSON.stringify(user) )
                    this.props.dispatch( actionInitialUser(user) );
                }
            }
        }
    }
    render() {
        return (
            <div className="AppComponent">
                <BrowserRouter>
                    <Route exact path="/" render={ ( ) => <ClientHomePage /> } />
                    <Route path="/play-now" render={ ( ) => <PlayNow /> }/>
                    <Route path="/friend" render={ ( ) => <ClientAboutPage />}/>
                    <Route path="/login" render={ () => <ClientLoginPage /> }/>
                    <Route path="/register" render={ () => <ClientRegisterPage /> }/>
                    <Route path="/forgot-password" render={ () => <ForgotPassword /> }/>
                    <Route path="/setting/logout" render={()=> <ForgotPassword /> } />
                    <Route path="/setting/accounts" render={()=> <ForgotPassword /> } />
                    <Route path="/developer" render={()=> <Developer /> } />
                </BrowserRouter>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return (
        { client : state.client , authentication : state.authentication }
    );
}
export default connect (mapStateToProps)(App);