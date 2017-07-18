import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'
import Footer from '../../../components/footer'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })
class CashOffline extends React.Component {
    render(){
        return (
            <section className="container recharge-table">
                <div className="table-tit">
                    <span>预付</span>
                    <span>实付</span>
                    <span>状态</span>
                    <span>类型</span>
                    <span>充值时间</span>
                </div>
                <ul className="table-con">
                    <li>
                        <span>￥<strong>3000</strong></span>
                        <span>￥<strong>3000</strong></span>
                        <span className="c5eb809">已付款</span>
                        <span className="ce20001">保证金</span>
                        <span>2017-04-19 19:47:06</span>
                    </li>
                    <li>
                        <span>￥<strong>3000</strong></span>
                        <span>￥<strong>3000</strong></span>
                        <span className="c5eb809">已付款</span>
                        <span className="ce20001">保证金</span>
                        <span>2017-04-19 19:47:06</span>
                    </li>
                </ul>
            </section>
        );
    }
};

const router = (
    <Switch>

    </Switch>
);

const Root = () => (
    <Provider store={store}>
        <div>
            <CashOffline />
            <Footer active="user"/>
            <div style={{padding: '0 25px'}}>
                <Router>
                    {router}
                </Router>
            </div>
        </div>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
