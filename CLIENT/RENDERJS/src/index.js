import 'core-js';

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "./styles/style.css";
import "./styles/animate.css";
import { createStore , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(Reducer , applyMiddleware(thunk));
store.subscribe(() => console.log('có thay đổi trong Redux!!'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById("root"));