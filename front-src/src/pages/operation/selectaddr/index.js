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
            <section className="container">
                <header className="header">
                    <span className="logo-ico"><img className="imgw" src={require('../../../assets/images/logo-ico.png')} alt="" /></span>
                    <strong className="header-tit"><img className="" src={require('../../../assets/images/operations/xzsh_page.png')} alt="选择收货地址" /></strong>
                </header>
                <div className="bg-line"><img className="imgw" src={require('../../../assets/images/bg_rule.png')} alt="" /></div>
                <section className="main-box">
                    <div className="goods-address mt20">
                        <h1>货品自提</h1>
                        <div className="address-info">
                            <p>上海市浦东新区三林镇511号</p>
                            <p>客服电话: 400-885-1666</p>
                            <p>工作时间: 周一至周五 (09:00-17:00)</p>
                            <p className="col666 mt08">如需亲自提货，请先于客服联络确认提货事宜。</p>
                            <span className="recommed-way"><img className="imgw" src={require('../../../assets/images/per_img_recommend.png')} alt="推荐方式" /></span>
                        </div>
                    </div>
                    <ul className="mineinfo-list">
                        <li className="mineinfo-item">
                            <p className="fs30"><span className="mr15">张奋斗</span>18710578855</p>
                            <p className="col666 mt15">上海市浦东新区上南路221号</p>
                            <div className="operate-info">
                                <div className="default-address ib active">
                                    <span className="radius-ico"><img className="imgw" src={require('../../../assets/images/ic_circle_sel.png')} alt="默认地址" /></span>默认地址
                                </div>
                                <div className="fr ib">
                                    <a className="col666 ib fl mr40" href="javascript:;">编辑</a>
                                    <a className="col666 in fl" href="javascript:;">删除</a>
                                </div>
                            </div>
                        </li>
                        <li className="mineinfo-item">
                            <p className="fs30"><span className="mr15">张奋斗</span>18710578855</p>
                            <p className="col666 mt15">上海市浦东新区三林镇511号</p>
                            <div className="operate-info">
                                <div className="default-address ib">
                                    <span className="radius-ico"><img className="imgw" src={require('../../../assets/images/ic_circle.png')} alt="默认地址" /></span>默认地址
                                </div>
                                <div className="fr ib">
                                    <a className="col666 ib fl mr40" href="javascript:;">编辑</a>
                                    <a className="col666 in fl" href="javascript:;">删除</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="add-address"><a href="javascript:;">添加收货地址</a></div>
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
