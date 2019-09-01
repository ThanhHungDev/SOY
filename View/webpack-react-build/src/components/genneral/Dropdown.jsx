import React, { Component } from 'react';
import PropType from "prop-types";
import "../../styles/general/Dropdown.css";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        /////////////////////////////////////////////////
        var list_render = [];
        const firstItem = this.props.list[0];
        if (typeof firstItem.label == 'undefined') {
            ///fix value key
            list_render = this.props.list.map(
                (item, key) => {
                    return (
                        { value : key , label : item }
                    )
                }
            )
        }else {
            list_render = this.props.list;
        }
        this.state = {
            isOpen: false,
            itemValueSelect: 0, 
            list : list_render
        };
        /////////////////////////////////////////////////
    }
    showDropdown = () => {
        console.log(4354352432);
        this.setState({ isOpen: true });
        // document.addEventListener("click", this.hideDropdown.bind(this));
    };
    // hideDropdown() {
    //     this.setState({ isOpen: false });
    //     document.removeEventListener("click", this.hideDropdown.bind(this));
    // };
    chooseItem = index => {
        console.log(index);
        if (typeof(this.state.list[index]) != 'undefined') {
            this.setState({ itemValueSelect : index , isOpen : false })
        }
    };

    render() {
        // const { list } = this.state;
        return (
            <div className={`dropdown ${this.state.isOpen ? 'open' : ''}`}>
                <button className="dropdown-toggle" type="button" onClick={this.showDropdown}>
                    {this.state.list[this.state.itemValueSelect].label}
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {this.state.list.map( 
                        (item, index) => <li key={index} value={item.value} onClick={this.chooseItem.bind(this , index)} >
                                            <a>{item.label}</a>
                                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Dropdown;
