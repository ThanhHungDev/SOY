import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//// css and custom define
import '../styles/client/App.css';
import AdminHomePage from './client/HomePage.jsx';
import AdminLoginPage from './client/Login.jsx';

class App extends Component {
    render() {
        return (
            <div className="AdminAppComponent">
                <BrowserRouter>
                    <Route exact path="/admin/" render={ ( ) => <AdminHomePage /> } />
                    <Route path="/admin/login" render={ () => <AdminLoginPage /> }/>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;