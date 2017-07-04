import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../reduxes/store'
import Head from '../../components/header'


const Root = () => (
    <div>
        <Head/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
