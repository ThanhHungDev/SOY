import React, { Component } from "react";
import { connect  } from 'react-redux';

import Message from "../genneral/Message.jsx";
import "../../styles/client/NowChat.css"

class NowChat extends Component {
    render() {
        return (
            <div className="NowChatComponent">
                <h2>Chat Messages</h2>
                <Message />
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