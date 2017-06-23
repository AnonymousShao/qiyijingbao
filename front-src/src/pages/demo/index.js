import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../reduxes/store'
import Head from '../../components/header'
// import Register from './regist'
// import Login from './login'
// import Reset from './reset'
// import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import http from  'axios'

// require('./style.scss')
// require('./sheet.scss')

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })
//
// const router = (
//     <Switch>
//         <Route path="/login" component={Login}/>
//         <Route path="/register" component={Register}/>
//         <Route path="/reset" component={Reset}/>
//     </Switch>
// )

const Root = () => (
    <div>
        <Head/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
