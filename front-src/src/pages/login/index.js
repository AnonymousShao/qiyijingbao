import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../reduxes/store'
import http from  'axios'
// import './style/style.css'


const Root = () => (
    <Provider store={store}>
        <div>hello
            <img src="/users" />
        </div>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);

