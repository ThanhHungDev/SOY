import React, { Component } from "react";
import { connect  } from 'react-redux';

////define
// import {actionJobClickDemo} from '../../actions';

import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import NowChat from "./NowChat.jsx";
import NowPlayer from "./NowPlayer.jsx";

class PlayNow extends Component {
    render() {
        return (
            <div className="PlayNowComponent">
                <Header />
                <div className="PlayNow">
                    đây là content PlayNow
                </div>
                <div className="PlayNow">
                    đây là content PlayNow
                </div>
                <div className="PlayNow">
                    đây là content PlayNow
                </div>
                <div className="PlayNow">
                    đây là content PlayNow
                </div>
                <div className="PlayNow">
                    đây là content PlayNow
                </div>
                <div className="container mean-fruit-gradient">
                    <div className="row">
                        <div className="col-6 col-xs-12 text-default">
                            <NowPlayer />
                        </div>
                        <div className="col-6 col-xs-12 text-red">
                            <NowChat />
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
        { player : state.player }
    );
}
export default connect(mapStateToProps)(PlayNow);