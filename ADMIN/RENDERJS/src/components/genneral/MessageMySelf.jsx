import React, { Component } from 'react';
class MessageMySelf extends Component {
    render() {
        return (
            <div className="MySelfMessage">
                <div className="ContentMessage">
                    <div className="InforUserSend">{this.props.name && this.props.name }</div>
                    <p className="Message">{this.props.message && this.props.message }</p>
                </div>
                <img className="AvatarMessage" 
                    src={this.props.avatar && this.props.avatar }
                    alt={this.props.name && this.props.name } />
            </div>
        );
    }
}
export default MessageMySelf;