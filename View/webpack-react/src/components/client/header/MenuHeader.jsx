import React, { Component } from 'react'
import CONFIG from './../../../config';

export default class MenuHeader extends Component {
    render() {
        const LOGO = {
            URL : CONFIG.SERVER.domain + "/logo/logo.png", 
            ALT : CONFIG.SERVER.title
        }
        
        
        return (
            <div className="MenuHeaderComponent clear">
                <div className="float-left">
                    <img src={LOGO.URL} alt={LOGO.ALT} />
                </div>
                <div className="float-right">
                    
                </div>
            </div>
        )
    }
}
