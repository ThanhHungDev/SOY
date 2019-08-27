import React, { Component } from "react";
//// css and custom define
import '../styles/App.css';
import Header from "../components/client/Header.jsx";

class App extends Component {
    render() {
        return (
            <div className="AppComponent">
                <Header />
            </div>
        );
    }
}
export default App;