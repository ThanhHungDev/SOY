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
        this.state = { activeMenuToggle: false };
    }
    activeSidebar = () => {
        this.setState({ activeMenuToggle: !this.state.activeMenuToggle } , () => {window.scrollTo(0, 0)});
    }
    render() {
        const LOGO = {
            URL: CONFIG.SERVER.domain + "logo/logo.png",
            ALT: CONFIG.SERVER.title
        }
        let data_menu = this.props.header;
        if(this.props.blog_data_menu_header)
            data_menu = this.props.blog_data_menu_header;
        return (
            <div className="HeaderComponent bg-unique-color-dark" >
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <div className={`MenuHeaderComponent clear ` +( this.state.activeMenuToggle? 'active' : '')}>
                                <a
                                    className="btn-toggle-menu"
                                    onClick={this.activeSidebar}>
                                    <IconAlignJustify />
                                </a>
                                <Link to="/" className="LinkHomePage">
                                    <img src={LOGO.URL} alt={LOGO.ALT} />
                                </Link>
                                <div className="WrapperMenu">
                                    <div className="SocialWrapper clear">
                                        <a href="https://www.facebook.com/HungSmurf">
                                            <Facebook />
                                        </a>
                                        <a href="https://www.facebook.com/HungSmurf">
                                            <Youtube />
                                        </a>
                                        <a href="https://www.facebook.com/HungSmurf">
                                            <Instagram />
                                        </a>
                                        <a className="btn-toggle-close"
                                            onClick={this.activeSidebar}>
                                            <IconClose/>
                                        </a>
                                    </div>
                                    <ul className="Menu clear" id="fixed">
                                        {data_menu.map(
                                            (item, index) => {
                                                return (
                                                    <LiMenu index={index} key={index} data_item={item} />)}
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        header: state.header
    }
}
export default connect(mapStateToProps)(Header);