import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'

import Footer from '../../../components/footer';
import Bidding from './Bidding';
import BidHis from './BidHis';
import BidSuc from './BidSuc';

import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class Bid extends React.Component {
    componentWillMount(){

    }
    render(){
        return (
            <div>
                <div className="content">
                    <header className="header">
                        <a href="" className="logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                        <a href="" className="title">竞拍历史</a>
                    </header>
                    <div className="main-content">
                        <a className='active' href="">竞拍中</a>
                        <a href="">竞拍历史</a>
                        <a href="">竞拍成功</a>
                    </div>
                    <Router>
                        {router}
                    </Router>
                    {/*<ul className="detail">
                        <li>
                            <div className="left"><img src="" alt=""/></div>
                            <div className="right">
                                <p className="goods">高山流水<span>(叶迪)</span></p>
                                <p className="lot">lot号 竞品名称</p>
                                <p className="deal">成交价： RMB 4000 <span>当前价：RMB 200</span></p>
                                <p className="myPrice">我的出价：RMB400</p>
                                <p className="area">专场：国画专拍</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"><img src="" alt=""/></div>
                            <div className="right">
                                <p className="goods">高山流水<span>(叶迪)</span></p>
                                <p className="lot">lot号 竞品名称</p>
                                <p className="deal">成交价： RMB 40,000</p>
                                <p className="myPrice">我的出价：RMB400</p>
                                <p className="area">专场：国画专拍</p>
                            </div>
                        </li>
                        <li className="bid-s">
                            <div className="content">
                                <div className="left"><img src="" alt=""/></div>
                                <div className="right">
                                    <p className="goods">高山流水<span>(叶迪)</span><img src={require('../../../assets/images/per_ic_s.png')} alt=""/></p>
                                    <p className="lot">lot号 竞品名称</p>
                                    <p className="area">专场名称：国画专拍</p>
                                    <p className="deal-time"><i></i>于04-23 13:20:10成交</p>
                                </div>
                            </div>
                            <div className="operate">
                                <a href="">设置</a>
                                <a href="">付费备案</a>
                                <a href="">详情</a>
                            </div>
                        </li>
                    </ul>*/}
                </div>
            </div>
        );
    }
};

const router = (
    <Switch>
        <Route path="/bidding" component={Bidding}/>
        <Route path="/bidhistory" component={BidHis}/>
        <Route path="/bidsuc" component={BidSuc}/>
    </Switch>
);

const Root = () => (
    <Provider store={store}>
        <div>
            <Bid />
            <Footer/>
        </div>
    </Provider>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
