import React, { Component } from "react";
import Header from './Header.jsx';
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";

class HomePage extends Component {
    render() {
        return (
            <div className="HomePageComponent">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default HomePage;