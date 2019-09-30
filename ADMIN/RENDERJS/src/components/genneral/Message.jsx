import React, { Component } from 'react';
import "../../styles/general/Message.css"
class Message extends Component {
    render() {
        return (
            <div className="MessageComponent clear">
                <div className="WrapperAvatar d-inline-block">
                    <img className="RoundedCircle Avatar" src="https://www.w3schools.com/w3images/avatar_g2.jpg"/>
                </div>
                <div className="MessageInformationUser d-inline-block">
                    <div className="Infor">
                        <span className="name">Truong thanh hùng</span>
                        <span className="timestamp">11:33:34</span>
                    </div>
                    <p className="MessageBody">Hi there! </p>
                </div>
            </div>
        );
    }
}
export default Message;