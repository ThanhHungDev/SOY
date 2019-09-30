import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link, Redirect } from 'react-router-dom';
import { connect  } from 'react-redux';

import CONFIG from "../../config";
import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import MessageMySelf from "../genneral/MessageMySelf.jsx"
import MessageChannel from "../genneral/MessageChannel.jsx";
import "../../styles/client/PlayNow.css";
import Send from "../../icon/svg/send.jsx";
import EllipsisAlt from "../../icon/svg/ellipsis-alt.jsx";
import { actionInitialUser , actionResetUserNull } from "../../actions";

class PlayNow extends Component {
    messagesEndRef = React.createRef()
    scrollToBottom = () => {
        if(this.props.authentication.access && this.props.authentication.id ){
            const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    componentDidUpdate () {
        this.scrollToBottom()
    }
    constructor(props) {
        super(props);
        this.state = {
            list_player: null,
            list_message : [],
            channel : null,
            mini_chat : false,
            loading_send_message : false
        };
    }
    active_mini_chat = () => {
        this.setState({ mini_chat : !this.state.mini_chat });
    }
    listenEnterPress = e => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          this.sendMessage();
        }
    }
    sendMessage = () => {
        var message = this.refs.message.value;
        if(message.trim()){
            this.setState({
                loading_send_message : true
            }, () => {
                var data_message = { 
                    id: this.props.authentication.id, 
                    message, 
                    channel : this.state.channel, 
                    access : this.props.authentication.access,
                    user_infor : this.props.authentication.user_infor
                };
                console.log("send message : "+ JSON.stringify(data_message));
                // alert(JSON.stringify(data_message));
                this.props.socket.emit("channel_message", data_message);
            });
        }
    }
    refeshToken(){
        var { client } = this.props, { id, refesh } = this.props.authentication;
        fetch(CONFIG.API.Refesh.url, {
            method: CONFIG.API.Refesh.method,
            dataType: "JSON",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id , refesh , client })
        }).then(resp => {
            console.log("refesh token trả ra : ");
            console.log(resp);
            return resp.json();
        }).then( response => {
            console.log("response in refesh" + JSON.stringify(response));
            if(response.code == 200){
                console.log("response in refesh 1");
                if (typeof(Storage) !== 'undefined') {
                    console.log("response in refesh 2");
                    var user = JSON.parse(localStorage.getItem('user'));
                    console.log("response in refesh 3");
                    var { id , access , refesh } = response.code;
                    var refesh_user = { ... user , id , access , refesh };
                    console.log("response in refesh 4");
                    localStorage.setItem('user', JSON.stringify(refesh_user));
                    /// nguy hiểm chưa test
                    console.log("response in refesh 5");
                    this.props.dispatch( actionInitialUser(refesh_user) );
                    // this.props.socket.emit("authentication", { authentication : refesh_user , client :this.props.client});
                    console.log("response in refesh 6");
                    if(this.state.loading_send_message){
                        console.log("response in refesh 7");
                        console.log("resend message vì access token fail 2p");
                        alert("resend message vì access token fail 2p");
                        this.sendMessage();
                    }
                } else {
                    console.log("response in refesh 8");
                    this.setState({ loading_send_message : false });
                    console.log('ứng dụng không chạy tốt trên trình duyệt này, vui lòng nâng cấp trình duyệt');
                    alert('ứng dụng không chạy tốt trên trình duyệt này, vui lòng nâng cấp trình duyệt');
                }
            }else{
                console.log("response in refesh response.code" );
                console.log(response.code);
                if (typeof(Storage) !== 'undefined') {
                    localStorage.setItem('user', null);
                    console.log("refesh không thành công localStorage.setItem user = null");
                    this.props.dispatch( actionResetUserNull() );
                }
                this.setState({ loading_send_message : false });
            }
        }).catch(error => {
            console.log("refesh catch client");
            console.log(error);
        });
    }
    componentDidMount() {
        this.scrollToBottom();

        // console.log(this.props.authentication);
        if(this.props.authentication.access && this.props.authentication.id ){
            this.props.socket.emit("authentication", { authentication : this.props.authentication , client :this.props.client});
        }
        this.props.socket.on("authentication_response" , response => {
            console.log("data trả ra là : ");
            console.log(response);
            if( response.status == 200 ){
                /// success 
                this.setState({ list_player : response.data[0].online , channel : response.data[0].channel });
            }else if( response.status == 403 ){
                /// refesh token
                this.refeshToken();
            }else{
                this.setState({ loading_send_message : false });
            }
        });
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
            this.refs.message.value = "";
            this.setState({ loading_send_message : false });
            console.log("channel_message_response: ");
            console.log(response.data);
            // alert (response.data);
            var new_message = response.data;
            if( response.status == 200 ){
                this.setState({ list_message : [...this.state.list_message, new_message] });
            }
        });
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
                            <div className="py-2 clear">
                                <div className="ListPlayer">
                                    <div className="wrapperPlayer">
                                        { this.state.list_player && this.state.list_player.map(
                                            (player , index ) => {
                                                return (
                                                    <div key={index} className="player position_relative">
                                                        <img src={player.avatar} alt={player.email} />
                                                        <p className="infor">{player.name}</p>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="ListMessage">
                                    <div className="wrapperMessage">
                                        <div className="MySelf clear position_relative">
                                            <p onClick={this.active_mini_chat}
                                            className="SmallChatScroll" ><EllipsisAlt /></p>
                                            <img className="avatar rounded-circle float-left" 
                                                src={this.props.authentication.user_infor.avatar}
                                                alt={this.props.authentication.user_infor.name} />
                                            <span className="UserInfor float-left">
                                                <b className="name">{this.props.authentication.user_infor.name}</b>
                                                <i className="mobile">{this.props.authentication.user_infor.mobile}</i>
                                            </span>    
                                        </div>
                                        <div className={`Chat scrollbar-light-defaul ` + (this.state.mini_chat ? 'mini_chat' : '')}
                                        ref={(el) => { this.messagesContainer = el; }}>
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
                                            <div ref={(el) => { this.messagesEnd = el; }}></div>
                                        </div>
                                        <div className="WriteMessage">
                                            <textarea className="Write" ref="message"
                                            onKeyDown={this.listenEnterPress}
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