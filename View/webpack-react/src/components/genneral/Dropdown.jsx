import React, { Component } from 'react';
import PropType from "prop-types";
import "../../styles/general/Dropdown.css";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
        };
    };

    showDropdownMenu = event => {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
        console.log("showDropdownMenu");
    }

    hideDropdownMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    render() {
        return (
            <div className="dropdown" style={{ background: "red", width: "200px" }} >
                <div className="button" onClick={this.showDropdownMenu}> My Setting </div>

                {this.state.displayMenu ? (
                    <ul>
                        <li><a className="active" href="#Create Page">Create Page</a></li>
                        <li><a href="#Manage Pages">Manage Pages</a></li>
                        <li><a href="#Create Ads">Create Ads</a></li>
                        <li><a href="#Manage Ads">Manage Ads</a></li>
                        <li><a href="#Activity Logs">Activity Logs</a></li>
                        <li><a href="#Setting">Setting</a></li>
                        <li><a href="#Log Out">Log Out</a></li>
                    </ul>
                ) :
                    (
                        null
                    )
                }

            </div>

        );
    }
}

export default Dropdown;
