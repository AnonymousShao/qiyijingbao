import React, {Component} from 'react'
import './style.scss'

export default class Header extends Component{

    render(){
        return (
            <div>
                <div className="header-wrap">
                    <div className="up">
                        <a className ="left edit">编辑</a>
                        <div className="right">
                            <a className="suggest"><i className="icon iconfont icon-tousujianyi"></i><p className="operat">投诉</p></a>
                            <a className="collect"><i className="icon iconfont icon-tousujianyi"></i><p className="operat">收藏</p></a>
                        </div>
                    </div>
                    <div className="down">
                        <div className="left">
                            <div className="avatar">
                                <img src="" alt=""/>
                            </div>
                            <img className="su" src={require('../../assets/images/ic_v.png')}/>
                        </div>
                        <div className="right">
                            <p className="id">12345678901</p>
                            <p className="vip">
                                <a className="plain">普通会员</a>
                                <a className="upgrade"><i className="icon iconfont icon-shengji"></i>升级</a>
                            </p>
                            <div className="cash">
                                <span>已交保证金</span>
                                <p className="rmb">1000RMB</p>
                            </div>
                        </div>
                    </div>
                    <a className="authed"><img src={require('../../assets/images/btn_acc.png')} alt=""/><span>实名认证</span><i className="icon iconfont icon-youjiantou"></i> </a>
                    <img className="head_bg" src={require('../../assets/images/per_bg_p.png')} alt=""/>
                    <div><img className='bg-rule' src={require('../../assets/images/bg_rule.png')} alt=""/></div>
                </div>
                <div className="bid">
                    <i className="icon iconfont icon-liaotianliebiaozuixiaohua"></i>
                    <div className="content"><span>恭喜您！</span>成功竞得：xxx中xxx产品XXXvuyfesayu</div>
                    <a className="icon iconfont icon-youjiantou"></a>
                </div>
            </div>
        )
    }
}