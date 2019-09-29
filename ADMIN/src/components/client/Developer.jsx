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
import Js from "../../icon/svg/js.jsx";
import Php from "../../icon/svg/php.jsx"
import Java from "../../icon/svg/java.jsx"
import avatar_dh_saigon from "../../icon/background/avatar-dh-saigon.jpg";


class Developer extends Component {
    render() {
        const background = {
            URL_AVATAR: CONFIG.SERVER.domain + "background/avatar-developer.jpg",
            URL_MOBILE: CONFIG.SERVER.domain + "background/bg-developer.jpg",
            URL_PC: CONFIG.SERVER.domain + "background/bg-developer-pc.jpg",
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
                <div className="bg-grey-x">
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
                        <div className="py-5 py-sm-0 px-5 px-sm-0">
                            <div className="row bg-white shadows-1 shadows-0-mobile">
                                <h2 className="TitleTopic">Kỹ Năng</h2>
                                <div className="col-12 py-3">
                                    <div className="row">
                                        <div className="col-6 col-sm-12">
                                            <h4>HTML, CSS</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-80"></div>
                                            </div>
                                            <h4>PHP</h4>
                                            <div className="progress">
                                                <div className="progress-bar w-85"></div>
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
                                                <div className="progress-bar w-50"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-5 py-sm-0 row">
                            <h2 className="TitleTopic py-3">Ngôn Ngữ</h2>
                            <div className="WrapperLanguageDevelopper clear">
                                <div className="BlockLanguage">
                                    <div className="IconTitleBlock">
                                        <Js />
                                    </div>
                                    <h6 className="text-center">Express.js, Reactjs, Jquery</h6>
                                    <h4 className="TitleBlockLang">JAVASCRIPT</h4>
                                    <p className="ContentLang">
                                        Ứng dụng đang dùng được viết trên nền nodejs trên công nghệ reactjs và nodejs express socket
                                    </p>
                                </div>
                                <div className="BlockLanguage Middle">
                                    <div className="IconTitleBlock">
                                        <Php />
                                    </div>
                                    <h6 className="text-center">PHP Core, Laravel,...</h6>
                                    <h4 className="TitleBlockLang">PHP</h4>
                                    <p className="ContentLang">
                                        Xây dựng các ứng dụng web động viết trên nền LAMP, LEMP. Có khả năng làm việc ở tất cả các giai đoạn của quy trình phát triển phần mềm
                                        từ phân tích hệ thống đến xây dựng website font-end lẫn back-end
                                    </p>
                                </div>
                                <div className="BlockLanguage">
                                    <div className="IconTitleBlock">
                                        <Java />
                                    </div>
                                    <h6 className="text-center">Servlet, Java core, C#, Redit</h6>
                                    <h4 className="TitleBlockLang">JAVA & C#</h4>
                                    <p className="ContentLang">
                                        Sử dụng Java, C#,... để built các web chuyên biệt hơn hoặc có yêu cầu phù hợp với project cụ thể
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line-height-0">
                    <h2 className="TitleTopic">Học Vấn</h2>
                    <div className="EducationDeveloper position_relative">
                        <div className="WrapperContentEducation">
                            <img className="avatar_dh_saigon vertical-align-middle" src={avatar_dh_saigon} alt="" />
                            <div className="DescriptionContentEdu vertical-align-middle">
                                <h3 className="title">Đại Học Sài Gòn</h3>
                                <q className="description">
                                    Đại Học Sài Gòn là 1 chuỗi hành trình học tập và rèn luyện kĩ năng.
                                    Được trải qua đoạn đường sinh viên trong Đh Sài Gòn, 
                                    nơi không chỉ vun đắp ước mơ mà còn 
                                    là nơi giúp bạn có những kỉ niệm không thể quên!
                                </q>
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