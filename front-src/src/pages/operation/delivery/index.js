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
class SelectAddr extends React.Component {
    render(){
        return (
            <div>
                <div className="content">
                    <header className="header">
                        <a href="" className="logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                        <a href="" className="title">交付方式</a>
                    </header>
                    <div className="main-content">
                        <a className='active' href="">货品自提</a>
                        <a href="">送货上门</a>
                        <a href="">物流运输</a>
                        <a href="">委托保管</a>
                    </div>
                    <div className="detail">
                        <ul className="detail">
                            <li>
                                <div className="title">货品自提</div>
                                <div className="right">
                                    <p className="addr">北京市昌平区回龙观122号</p>
                                    <p className="phone">客服电话：<span>12345678912</span></p>
                                    <p className="note">如需亲自提货，请先与客服联络确认提货事宜</p>
                                    <textarea className="editNote" resize="none" placeholder="自提备注..."></textarea>
                                </div>
                            </li>
                            <li>
                                <div className="left"><img src="" alt=""/></div>
                                <div className="right">
                                    <p className="addr">北京市昌平区回龙观122号</p>
                                    <p className="phone">预约电话：<span>12345678912</span></p>
                                    <div className="note">
                                        <p>如需亲自提货，请先与客服联络确认提货事宜</p>
                                        <p>如需亲自提货，请先与客服联络确认提货事宜</p>
                                    </div>
                                    <textarea className="editNote" resize="none" placeholder="自提备注..."></textarea>
                                </div>
                            </li>
                        </ul>
                        <div><button className="submit">提交</button></div>
                    </div>
                </div>
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
            <SelectAddr />
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
