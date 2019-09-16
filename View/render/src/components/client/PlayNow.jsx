import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect  } from 'react-redux';

import CONFIG from "../../config";
import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import MessageMySelf from "../genneral/MessageMySelf.jsx"
import MessageChannel from "../genneral/MessageChannel.jsx";
import "../../styles/client/PlayNow.css";
import Send from "../../icon/svg/send.jsx";

class PlayNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_player: null,
            list_message : [],
            channel : null,
            handleEnterPressUp : false
        };
    }
    listenEnterPress = e => {
        if(e.keyCode == 13 && !e.shiftKey) {
            this.sendMessage();
        }
    }
    listenEnterPressInputValueNull = e => {
        if(this.state.handleEnterPressUp){
            this.refs.message.value = "";
            this.setState({ handleEnterPressUp : false });
        }
    }
    sendMessage = () => {
        var message = this.refs.message.value;
        var data_message = { 
            id: this.props.authentication.id, 
            message, 
            channel : this.state.channel, 
            access : this.props.authentication.access,
            user_infor : this.props.authentication.user_infor
        };
        this.props.socket.emit("channel_message", data_message);
        this.setState({ handleEnterPressUp : true });
    }
    refeshToken(){
        var { client } = this.props, { id, refesh } = this.props.authentication;
        fetch(CONFIG.SERVER.domain + "/api/refesh", {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id , refesh , client })
        }).then(resp => {
            return resp.json();
        }).then( response => {
            console.log("response in refesh" + JSON.stringify(response));
            if(response.code == 200){
                if (typeof(Storage) !== 'undefined') {
                    var user = JSON.parse(localStorage.getItem('user'));
                    var { id , access , refesh } = response.code;
                    var refesh_user = { ... user , id , access , refesh };
                    localStorage.setItem('user', JSON.stringify(refesh_user));
                    /// nguy hiểm chưa test
                    this.props.dispatch( actionInitialUser(refesh_user) );
                    this.props.socket.emit("authentication", { authentication : refesh_user , client :this.props.client});
                } else {
                    alert('ứng dụng không chạy tốt trên trình duyệt này, vui lòng nâng cấp trình duyệt');
                }
            }
        }).catch(error => {
            console.log("refesh catch");
        });
    }
    componentDidMount() {
        // console.log(this.props.authentication);
        if(this.props.authentication.access && this.props.authentication.id ){
            this.props.socket.emit("authentication", { authentication : this.props.authentication , client :this.props.client});
            this.props.socket.on("authentication_response" , response => {
                console.log("data trả ra là : ");
                console.log(response);
                if( response.status == 200 ){
                    /// success 
                    this.setState({ list_player : response.data[0].online , channel : response.data[0].channel });
                }else if( response.status == 403 ){
                    /// refesh token
                    this.refeshToken();
                }
            });
        }
        this.props.socket.on("server_fail" , response => {
            console.log("server_fail: ");
            console.log(response);
        });
        this.props.socket.on("ready_refesh" , response => {
            console.log("ready_refesh: ");
            console.log(response);
        });
        this.props.socket.on("ready_set_channel" , response => {
            console.log("ready_set_channel: ");
            console.log(response);
        });
        this.props.socket.on("channel_message_response" , response => {
            console.log("channel_message_response: ");
            console.log(response);
            var new_message = response.data;
            if( response.status == 200 ){
                this.setState({ list_message : [...this.state.list_message, new_message] });
            }
        });
    }
    sendChat = () => {
        alert("ahihi");
    }  
    render() {
        console.log(this.state.list_message);
        if(!this.props.authentication.access || !this.props.authentication.id ){
            return (
                <div className="PlayNowComponent">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <h1 className="TitleChat">
                                Sẵn sàng để cùng chơi nào!!!
                            </h1>
                            <div className="clear">
                                <div className="ListPlayer">
                                    <div className="wrapperPlayer">
                                        palye
                                    </div>
                                </div>
                                <div className="ListMessage">
                                    <div className="wrapperMessage">
                                        <div className="MySelf clear">
                                            <img className="avatar rounded-circle float-left" 
                                            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" 
                                            alt="null" />
                                            <span className="UserName float-left">ahihi</span>
                                        </div>
                                        <div className="Chat">
                                            hugn
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/login">go to page login</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            );
        }
        return (
            <div className="PlayNowComponent">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="TitleChat">
                                Sẵn sàng để cùng chơi nào!!!
                            </h1>
                            <div className="clear">
                                <div className="ListPlayer">
                                    <div className="wrapperPlayer">
                                        { this.state.list_player && this.state.list_player.map(
                                            (player , index ) => {
                                                return (
                                                    <div key={index} className="player">{player.email}</div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="ListMessage">
                                    <div className="wrapperMessage">
                                        <div className="MySelf clear">
                                            <img className="avatar rounded-circle float-left" 
                                                src={this.props.authentication.user_infor.avatar}
                                                alt={this.props.authentication.user_infor.name} />
                                            <span className="UserInfor float-left">
                                                <b className="name">{this.props.authentication.user_infor.name}</b>
                                                <i className="mobile">{this.props.authentication.user_infor.mobile}</i>
                                            </span>    
                                        </div>
                                        <div className="Chat scrollbar-light-defaul">
                                            {this.state.list_message && this.state.list_message.map(
                                                ( message , index ) => {
                                                    if( message.id == this.props.authentication.id ){
                                                        return (
                                                            <MessageMySelf key={index}
                                                            name={message.user_infor.name} 
                                                            message={message.message}
                                                            avatar={message.user_infor.avatar}
                                                            />
                                                        );
                                                    }else{
                                                        return (
                                                            <MessageChannel key={index}
                                                            name={message.user_infor.name} 
                                                            message={message.message}
                                                            avatar={message.user_infor.avatar}
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                        </div>
                                        <div className="WriteMessage">
                                            <textarea className="Write" ref="message"
                                            onKeyDown={this.listenEnterPress}
                                            onKeyUp={this.listenEnterPressInputValueNull}
                                            rows="2" placeholder="Type your message...">
                                            </textarea>
                                            <button className="btnSendMessage" onClick={this.sendMessage}>
                                            <Send />
                                            </button>
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

// export default PlayNow;

const mapStateToProps = state => {
    return (
        { client : state.client , authentication : state.authentication, socket : state.socket }
    );
}
export default connect(mapStateToProps)(PlayNow);