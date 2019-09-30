import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
//// css and custom define
import '../styles/client/App.css';
import AdminLoginPage from './client/Login.jsx';
import AdminHomePage from './client/HomePage.jsx';

class App extends Component {
    render() {
        return (
            <div className="AppComponent">
                <BrowserRouter>
                    <Route exact path="/" render={ ( ) => <AdminHomePage /> } />
                    <Route path="/login" render={ () => <AdminLoginPage /> }/>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;