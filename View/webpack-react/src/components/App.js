import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';
import ClientLoginPage from './client/Login.jsx';
import ForgotPassword from "./client/ForgotPassword.jsx"
import ClientAboutPage from "./client/AboutPage.jsx"
import PlayNow from "./client/PlayNow.jsx"
import ClientRegisterPage from './client/Register.jsx';
import { actionInitialUser } from "../actions"
///

class App extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // localStorage.setItem('user', null)
        if(!this.props.authentication.access || !this.props.authentication.id ){
            if (typeof(Storage) !== 'undefined') {
                var user = JSON.parse(localStorage.getItem('user'));
                if( user && user.id ){
                    console.log("đã có dữ liệu của user login từ app component" + JSON.stringify(user) )
                    this.props.dispatch( actionInitialUser(user) );
                }
            }
        }
    }
    componentWillUnmount(){
        this.state.socket.emit('forceDisconnect');
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
                    <Route path="/forgot-password" render={()=> <ForgotPassword /> } />
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