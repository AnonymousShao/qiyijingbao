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
class Addr extends React.Component {
    render(){
        return (
            <section className="container">
                <header className="header">
                    <span className="logo-ico"><img className="imgw" src={require('../../../assets/images/operations/logo-ico.png')} /></span>
                    <strong className="header-tit"><img className="" src={require('../../../assets/images/operations/xgdz_page.png')} alt="修改地址" /></strong>
                </header>
                <div className="bg-line"><img className="imgw" src={require('../../../assets/images/operations/bg_rule.png')} alt="" /></div>
                <section className="main-box">
                    <form className="mt20 altadress-form" action="">
                        <div className="ptrbl info-item">
                            <label for="">收货人: </label>
                            <input type="text" placeholder="请填写收货人姓名" />
                        </div>
                        <div className="ptrbl info-item">
                            <label for="">联系电话: </label>
                            <input type="tel" placeholder="请填写收货人手机号" />
                        </div>
                        <div className="ptrbl info-item">
                            <label for="">收货地址: </label>
                            <textarea name="" rows="" cols="" placeholder="请输入收货地址"></textarea>
                        </div>
                        <div className="default-address ib l30 active">
                            <span className="radius-ico"><img className="imgw" src={require('../../../assets/images/operations/ic_circle_sel.png')} alt="默认地址" /></span>默认地址
                        </div>
                    </form>
                    <div className="save-address"><a href="javascript:;">保存</a></div>
                </section>
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
            <Addr />
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
