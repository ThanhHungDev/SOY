import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//// css and custom define
import '../styles/client/App.css';
import ClientHomePage from './client/HomePage.jsx';

class App extends Component {
    render() {
        return (
            <div className="AppComponent">
                <BrowserRouter>
                    <Route key="home" exact path="/" render={ ( ) => <ClientHomePage /> } />
                    <Route key="about" path="/about" render={ ( ) => <ClientHomePage /> }/>
                    <Route path="/contact" render={ ( ) => (<h2> contact  </h2>) }/>
                    <Route path="/admin" render={ ( ) => (<h2> adminPage  </h2>) }/>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;