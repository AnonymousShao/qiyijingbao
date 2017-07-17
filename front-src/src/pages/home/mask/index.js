import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import {store} from '../../../reduxes/store'

import '../common.scss'
import './style.scss'

import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// http.get('/login/sendMSMALL?phone=13248260781').then(data=>{
//     debugger
// })

class Mask extends React.Component {
    render(){
        return (
            <div>
                <section className="tb-content">
                    <header className="tb-header">
                        <a href="" className="return-back"><img src="img/back.png" alt=""/></a>
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
                <section className="tb-auction-detail">
                    <figure className="tb-auction-detail-gdmask"></figure>
                    <header className="tb-auction-header">
                        <span className="tb-auction-detail-title">详情</span>
                        <span className="tb-auction-detail-close">×</span>
                    </header>
                    <section className="tb-auction-detail-name">
                        <article>
                            <p className="tb-auction-detail-fullname">LOT 竞品名称</p>
                            <p className="tb-auction-detail-id">唯一识别码:8845454</p>
                        </article>
                        <section className="tb-collect-state tb-collect-success"></section>
                    </section>
                    <section className="tb-auction-detail-price">
                        <p className="tb-auction-detail-hammer">
                            <span className="tb-auction-headline">落槌价:</span>
                            <span className="tb-auction-price">RMB 1,000</span>
                        </p>
                        <p className="tb-auction-detail-commission">
                            <span className="tb-auction-headline">佣金:</span>
                            <span className="tb-auction-price">8% 折合RMB 8</span>
                        </p>
                        <p className="tb-auction-detail-bargain">
                            <span className="tb-auction-headline">成交金额:</span>
                            <span className="tb-auction-price">RMB 1,000</span>
                        </p>
                        <p className="tb-auction-detail-pocket">
                            <span className="tb-auction-headline">实付金额:</span>
                            <span className="tb-auction-price tb-auction-reality">RMB 1,000</span>
                        </p>
                    </section>
                    <section className="tb-auction-detail-way">
                        <p className="payment">
                            <span>付款方式:</span><span>线下支付</span>
                        </p>
                        <p className="paymentTime">
                            <span>成交时间:</span><span>04-21 11:01</span>
                        </p>
                        <p className="payTime">
                            <span>付款时间:</span><span>04-21 11:01</span>
                        </p>
                    </section>
                    <section className="tb-auction-detail-logistics">
                        <p className="payment">
                            <span>物流方式:</span><span>货品自提</span>
                        </p>
                        <p className="paymentTime">
                            <span>自提地址:</span><span>上海市浦东新区三林镇511号</span>
                        </p>
                        <p className="payTime">
                            <span>客服电话:</span><span>400-855-1666</span>
                        </p>
                        <p className="workTime">
                            <span>工作时间:</span><span>周一至周五 (09:00~17:00)</span>
                        </p>
                    </section>
                    <section className="tb-auction-detail-padding">关闭</section>
                    <section className="tb-auction-detail-closegd">关闭</section>
                </section>
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
            <Mask/>
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
