import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';
import ClientLoginPage from './client/Login.jsx';
import ForgotPassword from "./client/ForgotPassword.jsx"

class App extends Component {
    render() {
        return (
            <div className="AppComponent">
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
export default App;