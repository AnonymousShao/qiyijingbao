import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../reduxes/store'
import Head from '../../components/user_header'
import Show from '../../components/show'
import Footer from '../../components/footer'
import './common.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

const router = (
    <Switch>

    </Switch>
);

const Root = () => (
    <Provider store={store}>
        <div>
            <Head />
            <Show />
            <div style={{padding: '0 25px'}}>
                <Router>
                    {router}
                </Router>
            </div>
            <Footer active="user" />
        </div>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
