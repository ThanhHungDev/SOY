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
        this.setState({ activeMenuToggle: !this.state.activeMenuToggle });
    }
    render() {
        const LOGO = {
            URL: CONFIG.SERVER.domain + "/logo/logo.png",
            ALT: CONFIG.SERVER.title
        }
        const data_menu = this.props.header
        return (
            <div className="HeaderComponent" >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={`MenuHeaderComponent clear Small-Wrapper-Menu ` +( this.state.activeMenuToggle? 'active' : '')}>
                                <a
                                    className="btn-toggle-menu mobile BTN-Small-Toggle-Menu"
                                    onClick={this.activeSidebar}>
                                    {this.state.activeMenuToggle ? <IconClose/> : <IconAlignJustify />}
                                </a>
                                <div className="float-left">
                                    <Link to="/" className="d-inline-block">
                                        <img src={LOGO.URL} alt={LOGO.ALT} />
                                    </Link>
                                </div>
                                <div className="float-right Small-Fixed-Sidebar">
                                    <ul className="wrapper-menu-left clear PC-MenuLeft">
                                        {data_menu.map((item, index) => <LiMenu index={index} key={index} data_item={item} />)}
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