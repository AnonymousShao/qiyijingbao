import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'

import Footer from '../../../components/footer';
import './success/style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class Bar extends React.Component {
    render(){
        return (
            <div className="content">
                <header className="header">
                    <a href="" className="logo"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></a>
                    <a href="" className="title">议价中</a>
                </header>
                <div className="main-content">
                    <a className='active' href="">竞价中</a>
                    <a href="">出价历史</a>
                    <a href="">议价成功</a>
                </div>
                <ul className="detail">
                    <li>
                        <div className="left"><img src={require('../../../assets/images/logo@2x.png')} alt=""/></div>
                        <div className="right">
                            <p className="lot">lot号 竞品名称</p>
                            <p className="artist">艺术家 snuhsd</p>
                            <p className="myPrice">我的出价：RMB400{/* <span>成交金额：500</span>*/}</p>
                            <p className="high">最高出价：RMB100 <span>当前状态：已售</span></p>
                        </div>
                    </li>
                    <li>
                        <div className="left"><img src={require('../../../assets/images/logo@2x.png')} alt="" /></div>
                        <div className="right">
                            <p className="lot">lot号 竞品名称</p>
                            <p className="artist">艺术家 snuhsd</p>
                            <p className="myPrice">我的出价：RMB400 <span>成交金额：500</span></p>
                            <p className="high">最高出价：RMB100 <span>当前状态：已售</span></p>
                        </div>
                    </li>
                </ul>
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
            <Bar/>
            <Footer/>
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
