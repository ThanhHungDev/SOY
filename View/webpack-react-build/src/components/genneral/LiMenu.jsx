import React, { Component } from "react";
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import IconAngleDown from "../../icon/svg/angle-down.jsx";
import { connect } from "react-redux"

////define
import {actionChangeActiveMenu} from '../../actions';
class LiMenu extends Component {
    showDropdown = ()=>{
        this.props.dispatch(actionChangeActiveMenu(this.props.index));
    }
    render() {
        const item = this.props.data_item; 
        return (
            <li onClick={this.showDropdown} className={ typeof item.active != 'undefined' && item.active ? "active" : ''}>
                {item.url ? 
                <Link to={item.url} > {item.title} </Link> 
                :
                <a>
                    {item.title}
                    {item.submenu && <IconAngleDown addClass="Small-Icon-Push-Right" />}
                </a>
                }
                {item.submenu && (
                    <ul className="submenu">
                        {item.submenu.map((sub_item, sub_index) => {
                            return (
                                <li key={sub_index}>
                                    <Link to={sub_item.url}>
                                        {sub_item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </li>
        );
    }
}

LiMenu.propTypes = {
    data_item : PropTypes.any
};
export default connect()(LiMenu);