import React, { Component } from "react";
import TopHeader from './header/TopHeader.jsx';
import MenuHeader from './header/MenuHeader.jsx';
class Header extends Component {
    render() {
        return (
            <div className="HeaderComponent">
                <TopHeader />
                <MenuHeader />
            </div>
        );
    }
}

export default Header;