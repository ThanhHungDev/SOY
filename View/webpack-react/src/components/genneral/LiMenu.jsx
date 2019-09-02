import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom"
import PropTypes from 'prop-types';
import IconAngleDown from "../../icon/svg/angle-down.jsx";
import { connect } from "react-redux";
///
import { Dropdown } from "../../actions";

const DropdownName = "menu";
class LiMenu extends Component {
    constructor(props){
        super(props);
    }
    handleClickDropdown = e => {
        this.props.dispatch(Dropdown({active : DropdownName+this.props.index}));
    }
    render() {
        const { active } = this.props.is_click_dropdown;
        var isActiveMenu = false;
        if(active == DropdownName+this.props.index )
            isActiveMenu = !isActiveMenu;
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
                <a onClick={this.handleClickDropdown}>
                    {item.title} <IconAngleDown addClass="Small-Icon-Push-Right" />
                </a>
                <ul className={isActiveMenu ? 'submenu active' : 'submenu'}>
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

LiMenu.propTypes = {
    data_item : PropTypes.any
};
const mapStateToProps = (state) => {
    return {
        is_click_dropdown: state.is_click_dropdown,
        information : state.information_client
    }
}
export default connect(mapStateToProps)(LiMenu);