import React, { Component } from 'react';
import "../../styles/general/Alert.css"
class AlertDanger extends Component {
    render() {
        return (
            <div className="AlertDangerComponent alert alert-warning">
                {this.props.message}
            </div>
        );
    }
}
export default AlertDanger;