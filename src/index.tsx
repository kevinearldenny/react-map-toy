import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './components/Map';
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <Map />
    </Provider>,
    rootElement
);