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
import "../../styles/client/Developer.css"

class Developer extends Component {
    render() {
        const background = {
            URL_AVATAR: CONFIG.SERVER.domain + "/background/avatar-developer.jpg",
            URL_MOBILE: CONFIG.SERVER.domain + "/background/bg-developer.jpg",
            URL_PC: CONFIG.SERVER.domain + "/background/bg-developer-pc.jpg",
            ALT: CONFIG.SERVER.title
        }
        return (
            <div className="DeveloperComponent">
                <Header />
                <div className="BlackImage line-height-0">
                    <svg className="hero-triangles" viewBox="0 0 263.07 394.61" preserveAspectRatio="xMinYMax meet">
                        <polygon className="primary-triangle" points="0 394.61 0 0 263.07 263.07 131.53 394.61 0 394.61"></polygon>
                        <polygon className="gray-triangle" points="0 394.61 0 263.07 131.53 394.61 0 394.61"></polygon>
                        <polygon className="gray-triangle" points="131.53 394.61 197.3 328.84 263.07 394.61 131.53 394.61"></polygon>
                    </svg>
                    <h1>Trương Thanh Hùng <span>Web developer</span></h1>
                    <img className="mobile" src={background.URL_MOBILE} alt={background.ALT} />
                    <img className="pc" src={background.URL_PC} alt={background.ALT} />
                </div>
                <div className="bg-grey-x pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="row py-3">
                                    <div className="col-4 col-lg-5 col-sm-12 AvatarDeveloper">
                                        <img src={background.URL_AVATAR} alt={background.ALT} />
                                    </div>
                                    <div className="col-8 col-lg-7 col-sm-12">
                                        <h2 className="title-section">Thông Tin Cơ Bản</h2>
                                        <div className="BaseInformation">
                                            <div className="WrapperItemInfor">
                                                <p className="title">Tên Đầy Đủ</p>
                                                <p>Trương Thanh Hùng</p>
                                            </div>
                                            <div className="WrapperItemInfor">
                                                <p className="title">Địa Chỉ</p>
                                                <p>0674, lộc hòa, bình giã, Châu Đức, Bà Rịa - Vũng Tàu</p>
                                            </div>
                                            <div className="WrapperItemInfor">
                                                <p className="title">Số Điện Thoại</p>
                                                <p>079.7581.480</p>
                                            </div>
                                            <div className="WrapperItemInfor">
                                                <p className="title">email</p>
                                                <p>thanhhung.tud@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-5 py-sm-0">
                            <div className="row bg-white shadows-1 shadows-0-mobile">
                                <h2 className="TitleTopic">Skill</h2>
                                <div className="col-12 py-3">
                                    <div className="row">
                                        <div className="col-6 col-sm-12">
                                            <h4>HTML, CSS</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-75"></div>
                                            </div>
                                            <h4>PHP</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-50"></div>
                                            </div>
                                            <h4>JAVASCRIPT</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-75"></div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-sm-12">
                                            <h4>SQL</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-75"></div>
                                            </div>
                                            <h4>SERVER</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-50"></div>
                                            </div>
                                            <h4>JAVA, C#</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-25"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Developer;