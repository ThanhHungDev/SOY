import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link, Redirect } from 'react-router-dom';
import { connect  } from 'react-redux';

import CONFIG from "../../config";
import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import MessageMySelf from "../genneral/MessageMySelf.jsx"
import MessageChannel from "../genneral/MessageChannel.jsx";
import Send from "../../icon/svg/send.jsx";

class Developer extends Component {
    render() {
        const background = {
            URL: CONFIG.SERVER.domain + "/background/temp.jpg",
            ALT: CONFIG.SERVER.title
        }
        return (
            <div className="DeveloperComponent">
                <Header />
                <div className="BlackImage">
                    <img src={background.URL} alt={background.ALT} />
                    <svg className="hero-triangles" viewBox="0 0 263.07 394.61" preserveAspectRatio="xMinYMax meet">
                        <polygon className="primary-triangle" points="0 394.61 0 0 263.07 263.07 131.53 394.61 0 394.61"></polygon>
                        <polygon className="gray-triangle" points="0 394.61 0 263.07 131.53 394.61 0 394.61"></polygon>
                        <polygon className="gray-triangle" points="131.53 394.61 197.3 328.84 263.07 394.61 131.53 394.61"></polygon>
                    </svg>
                    <h1>Trương Thanh Hùng <span>Web developer</span></h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="DeveloperTitle">
                                đây là trang developer
                            </h1>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Developer;