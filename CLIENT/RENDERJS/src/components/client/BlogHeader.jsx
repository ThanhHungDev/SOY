import React, { Component } from "react";
import { Link , NavLink } from "react-router-dom"
import { connect } from "react-redux";
/**
 * import define
 */
import CONFIG from "../../config";
import IconAlignJustify from "../../icon/svg/align-justify.jsx";
import IconClose from "../../icon/svg/windows-close.jsx"
import LiMenu from "../genneral/LiMenu.jsx";
import Facebook from "../../icon/svg/facebook.jsx";
import Youtube from "../../icon/svg/youtube.jsx";
import Instagram from "../../icon/svg/instagram.jsx";

import Header from './Header.jsx';
import Footer from "./Footer.jsx";
/**
 * import css
 */
import "../../styles/client/Header.css";
class BlogHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_menu : []
        };
    }
    componentDidMount(){
        fetch(CONFIG.API.MenuBlog.url)
        .then(response => response.json())
        .then(data => this.setState({
            data_menu : data
        }))
        .catch(err => true);
    }
    render() {
        return (
            <Header blog_data_menu_header={this.state.data_menu} />
        );
    }
}
export default BlogHeader;