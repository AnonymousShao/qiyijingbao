import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'
import Footer from '../../../components/footer'
import './style.scss';

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class Bid extends React.Component {
    render(){
        return (
            <section className="tb-content">
                <header className="tb-header">
                    <a href="" className="return-back"><img src={require('../../../assets/images/bg_rule.png')} alt=""/></a>
                    <a href="">我的收藏</a>
                    <a href=""></a>
                </header>
                <figure className="tb-line"></figure>
                <ul className="tb-tab-list">
                    <li className="tb-tab-item tb-tab-active">作品</li>
                    <li className="tb-tab-item">艺术家</li>
                </ul>
                <article className="tb-order">按收藏时间<span>↓</span>排序</article>
                <ul className="tb-collect-list">
                    <li className="tb-collect-item">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-auction"></section>
                    </li>
                    <li className="tb-collect-item">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-success"></section>
                    </li>
                    <li className="tb-collect-item">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-over"></section>
                    </li>
                    <li className="tb-collect-item">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-exhibition"></section>
                    </li>
                    <li className="tb-collect-item">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-preview"></section>
                    </li>
                    <li className="tb-collect-item">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-pay"></section>

                    </li>
                    <li className="tb-collect-item">
                        <figure className="tb-collect-user">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-userinfo">
                            <p className="tb-user-name">刘德华</p>
                            <p className="tb-user-id">GW343f2</p>
                            <p className="tb-user-pro">这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字</p>
                        </article>
                    </li>
                    <li className="tb-collect-item tb-collect-delete">
                        <figure className="tb-collect-user">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-userinfo">
                            <p className="tb-user-name">刘德华</p>
                            <p className="tb-user-id">GW343f2</p>
                            <p className="tb-user-pro">这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字这是一段介绍文字</p>
                        </article>
                        <section className="tb-collect-delete">删除</section>
                    </li>
                    <li className="tb-collect-item tb-collect-delete">
                        <figure className="tb-collect-logo">
                            <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=401680676,1846288314&fm=58" alt=""/>
                        </figure>
                        <article className="tb-collect-info">
                            <p className="tb-collect-title">LOT号&nbsp;竞拍产品</p>
                            <p className="tb-collect-name">刘克明▪2016作</p>
                            <p className="tb-collect-stage">国画精品专场</p>
                            <p className="tb-collect-year">于2017-08-07收藏</p>
                        </article>
                        <section className="tb-collect-state tb-collect-pay"></section>
                        <section className="tb-collect-delete">删除</section>
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
            <Bid />
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
