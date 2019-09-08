import React, { Component } from 'react';
import "../../styles/general/progress.css"
class ProgressBar extends Component {
    render() {
        return (
            <div className="ProgressComponent clear  animated fadeIn">
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        );
    }
}
export default ProgressBar;