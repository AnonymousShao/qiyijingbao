import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'

import Footer from '../../../components/footer';
import '../common.scss'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class MsgBox extends React.Component {
    render(){
        return (
            <div>
                <section className="tb-content">
                <header className="tb-header">
                    <a href="" className="tb-logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                    <a href="" className="tb-title">消息盒子</a>
                </header>
                <ul className="ta-message">
                    <li className="ta-message-item">
                        <p className="ta-message-icon ta-message-bidding">
                            <i className="num">3</i>
                        </p>
                    </li>
                    <li className="ta-message-item">
                        <p className="ta-message-icon ta-message-bargain">
                            <i className="num">3</i>
                        </p>
                    </li>
                    <li className="ta-message-item">
                        <p className="ta-message-icon ta-message-fund">
                            <i className="num">3</i>
                        </p>
                    </li>
                    <li className="ta-message-item">
                        <p className="ta-message-icon ta-message-sys">
                            <i className="num">3</i>
                        </p>
                    </li>
                </ul>
                <ul className="ta-message-news">
                    <li className="ta-message-item">
                        <p className="tb-message-title">
                            <i className="ta-message-state">新</i>
                            <span className="ta-message-time">04-5 15:14</span>
                        </p>
                        <p className="ta-message-content">这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</p>
                    </li>
                    <li className="ta-message-item">
                        <p className="tb-message-title">
                            <i className="ta-message-state">新</i>
                            <span className="ta-message-time">04-5 15:14</span>
                        </p>
                        <p className="ta-message-content">这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</p>
                    </li>
                </ul>
                <section className="ta-message-history">
                    <header className="ta-message-history-title">
                        <a href="" className="ta-message-title-line"></a>
                        <a href="" className="ta-message-title">以下是历史消息</a>
                        <a href="" className="ta-message-title-line"></a>
                    </header>
                    <ul className="tb-message-list">
                        <li className="tb-message-item">
                            <p className="tb-message-title">
                                <span className="ta-message-time">04-5 15:14</span>
                            </p>
                            <p className="ta-message-content">这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</p>
                        </li>
                    </ul>
                </section>
            </section>
                <section class="tb-scrollTop"></section>
            </div>
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
            <MsgBox/>
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
