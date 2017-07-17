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
class AddCash extends React.Component {
    render(){
        return (
            <section className="container">
                <header className="header">
                    <span className="logo-ico"><img className="imgw" src={require('../../../assets/images/logo@2x.png')} alt="" /></span>
                    <strong className="header-tit"><img className="" src={require('../../../assets/images/operations/czjl_page.png')} alt="充值记录" /></strong>
                </header>
                <div className="bg-line"><img className="imgw" src={require('../../../assets/images/bg_rule.png')} alt="" /></div>
                <ul className="main-box recharge-list">
                    <li className="recharge-item">
                        <a href="javascript:;">
                            <p className="fs27"><span className="mr15">预付:</span>RMB 100</p>
                            <p className="fs22 col666"><span className="mr15">类型:</span>保证金</p>
                            <p className="fs22 col666"><span className="mr15">时间:</span>2016-08-20 13:30:35</p>
                            <span className="recharge-state c5eb809">已付款</span>
                        </a>
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
            <AddCash />
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
