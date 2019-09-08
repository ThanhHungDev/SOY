import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header.jsx';
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";


class HomePage extends Component {
    render() {
        console.log(this.props.authentication)
        return (
            <div className="HomePageComponent">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return (
        { client : state.client , authentication : state.authentication }
    );
}
export default connect (mapStateToProps)(HomePage);