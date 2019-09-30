import React, { Component } from 'react';

class Phone extends Component {
    render() {
        return (
            <span className="IconPhone icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="phone-alt" role="img" 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  className="svg-inline--fa">
                    <path fill="#adb5bd" d="M493.09 351.3L384.7 304.8a31.36 31.36 0 0 0-36.5 8.9l-44.1 53.9A350 350 0 0 1 144.5 208l53.9-44.1a31.35 31.35 0 0 0 8.9-36.49l-46.5-108.5A31.33 31.33 0 0 0 125 .81L24.2 24.11A31.05 31.05 0 0 0 0 54.51C0 307.8 205.3 512 457.49 512A31.23 31.23 0 0 0 488 487.7L511.19 387a31.21 31.21 0 0 0-18.1-35.7zM456.89 480C222.4 479.7 32.3 289.7 32.1 55.21l99.6-23 46 107.39-72.8 59.5C153.3 302.3 209.4 358.6 313 407.2l59.5-72.8 107.39 46z" stroke="none" strokeWidth="1px"></path>
                </svg>
            </span>
        );
    }
}

export default Phone;
