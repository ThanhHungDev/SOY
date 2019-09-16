import React, { Component } from 'react';
import "../../styles/general/Alert.css";
import { Link } from 'react-router-dom';
class AlertSuccess extends Component {
    render() {
        return (
            <div className="AlertSuccessComponent alert alert-success">
                {this.props.message} {this.props.link && <Link to={this.props.link.path}> { this.props.link.text } </Link>}
            </div>
        );
    }
}
export default AlertSuccess;