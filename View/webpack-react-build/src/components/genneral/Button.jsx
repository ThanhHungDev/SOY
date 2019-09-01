import React, { Component } from 'react';
import PropType from "prop-types";

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }
    render() {
        return (
            <button onClick={this.handleClick} className={this.state.isToggleOn ? this.props.clickOn.className : this.props.clickOff.className}>
                {this.state.isToggleOn ? this.props.clickOn.text : this.props.clickOff.clickOff.text}
            </button>
        )
    }
}
Button.PropType = {
    clickOn : PropType.shape({
        text : PropType.string,
        className : PropType.string
    }),
    clickOff : PropType.shape({
        text : PropType.string,
        className : PropType.string
    })
}
Button.defaultProps = {
    clickOn : {
        text : 'ON',
        className : 'btn-on'
    },
    clickOn : {
        text : 'OFF',
        className : 'btn-off'
    }
}