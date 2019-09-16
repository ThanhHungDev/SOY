import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import IconAngleDown from "../../icon/svg/angle-down.jsx";

const DropdownName = "menu";
class LiMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSubmenu : false
        }
    }
    showDropdownMenu = () => {
        this.setState({ showSubmenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }
    hideDropdownMenu = () => {
        this.setState({ showSubmenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.hideDropdownMenu );
    }
    render() {
        const item = this.props.data_item; 
        return (
            item.url ? 
            <li>
                <NavLink to={item.url} activeClassName="active"> 
                    {item.title} 
                </NavLink>
            </li>
            : 
            <li>
                <a onClick={this.showDropdownMenu}>
                    {item.title} <IconAngleDown addClass="Small-Icon-Push-Right" />
                </a>
                <ul className={"submenu" + (this.state.showSubmenu ? ' active' : '')}>
                    {item.submenu.map((sub_item, sub_index) => {
                        return (
                            <li key={sub_index}>
                                <NavLink to={sub_item.url}>
                                    {sub_item.title}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    }
}
export default LiMenu;