import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {HashRouter as Router} from "react-router-dom";
import {router} from './routers'
import {store} from './reduxes/store'
import './style/style.css'

const Root = () => (
    <Provider store={store}>
        <Router>
            {router}
        </Router>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);

