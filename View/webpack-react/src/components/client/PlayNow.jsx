import React, { Component } from "react";
import { connect  } from 'react-redux';
import socketIOClient from "socket.io-client";

import CONFIG from "../../config";
import Header from './Header.jsx';
import Footer from "./Footer.jsx";

import "../../styles/client/PlayNow.css";

class PlayNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: CONFIG.SERVER.domain,
            socket : null
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        this.setState({ socket });
        socket.emit("authentication", { authentication : this.props.authentication , client :this.props.client});
        socket.on("authentication_response" , data => {
            console.log("data trả ra là : ");
            console.log(data);
        });
    }
    sendChat = () => {
        alert("ahihi");
    }  
    render() {
        return (
            <div className="PlayNowComponent">
                <Header />
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.sendChat}>
                            <div className='input-group'>
                                <input type='text'  className="form-control" placeholder="Type your message..."/>
                                <div className='input-group-append'>
                                    <button className='btn btn-primary'>Send</button>
                                </div>
                            </div>
                        </form>
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
        { client : state.client , authentication : state.authentication }
    );
}
export default connect(mapStateToProps)(PlayNow);