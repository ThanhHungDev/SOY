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

/**
 * import css
 */
import "../../styles/client/Header.css";
class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="HeaderComponent bg-unique-color-dark" >
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            ghfgh
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;