import React, { Component } from "react";
import Header from './Header.jsx';

class AboutPage extends Component {
    render() {
        return (
            <div className="AboutPageComponent">
                <Header />
                <div className="wrapper-underline">
                    <a className="underline" href="hung">about</a>
                </div>
            </div>
        );
    }
}

export default AboutPage;