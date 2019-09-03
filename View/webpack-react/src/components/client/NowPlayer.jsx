import React, { Component } from "react";
import { connect  } from 'react-redux';

class NowPlayer extends Component {
    render() {
        return (
            <div className="NowPlayerComponent">
                <h2>Image</h2>
                <p>The .img-responsive class makes the image scale nicely to the parent element (resize the browser window to see the effect):</p>                  
                <img src="https://www.w3schools.com/bootstrap/cinqueterre.jpg" alt="Cinque Terre" width="304" height="236"/> 
            </div>
        );
    }
}

// export default NowPlayer;

const mapStateToProps = state => {
    return (
        { players : state.players }
    );
}
export default connect(mapStateToProps)(NowPlayer);