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
                    <Route exact path="/" render={ ( ) => <ClientHomePage /> } />
                    <Route path="/play-now" render={ ( ) => <PlayNow /> }/>
                    <Route path="/friend" render={ ( ) => <ClientAboutPage />}/>
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