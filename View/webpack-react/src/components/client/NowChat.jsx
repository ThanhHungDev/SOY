import React, { Component } from "react";
import { connect  } from 'react-redux';
import "../../styles/client/NowChat.css"

class NowChat extends Component {
    render() {
        return (
            <div className="NowChatComponent">
                <h2>Chat Messages</h2>
                <div className="wrapper-chat">
                    <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" />
                        <p>Hello. How are you today?</p>
                        <span className="time-right">11:00</span>
                </div>
                <div className="wrapper-chat darker">
                    <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" className="right"/>
                        <p>Hey! I'm fine. Thanks for asking!</p>
                        <span className="time-left">11:01</span>
                </div>
                <div className="wrapper-chat">
                    <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" />
                        <p>Sweet! So, what do you wanna do today?</p>
                        <span className="time-right">11:02</span>
                </div>
                <div className="wrapper-chat darker">
                    <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" className="right"/>
                        <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
                        <span className="time-left">11:05</span>
                </div>
            </div>
        );
    }
}

// export default NowChat;

const mapStateToProps = state => {
    return (
        { messages : state.messages }
    );
}
export default connect(mapStateToProps)(NowChat);