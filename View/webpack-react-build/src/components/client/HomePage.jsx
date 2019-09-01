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
                <div className="wrapper-underline">
                    <a className="underline" href="hung">hungtt</a>
                </div>
                <Footer />
            </div>
        );
    }
}

export default HomePage;