import React, {Component} from 'react'
import './style.scss'

export default class Show extends Component{

    render(){
        return (
           <div>
               <div className="auction">
                   <div className="title">我的竞价</div>
                   <div className="content">
                       <a className="bidding" href="/home_bid.html#/bidding">
                           <p className="icon"><img src={require('../../assets/images/per_ic_auction@2x.png')} alt=""/></p>
                           <p className="icon-title">竞拍中</p>
                       </a>
                       <a className="bid-history"  href="/home_bid.html#/bidhistory">
                           <p className="icon"><img src={require('../../assets/images/per_ic_auction-h@2x.png')}/></p>
                           <p className="icon-title">竞拍历史</p>
                       </a>
                       <a className="bid-success"  href="/home_bid.html#/bidsuc">
                           <p className="icon"><img src={require('../../assets/images/per_ic_auction-s@2x.png')} alt=""/></p>
                           <p className="icon-title">竞拍成功</p>
                       </a>
                   </div>
               </div>
               <div className="bargin">
                   <div className="title">我的议价</div>
                   <div className="content">
                       <a className="bidding"  href="/home_bargin.html">
                           <p className="icon"><img src={require('../../assets/images/per_ic_bar@2x.png')} alt=""/></p>
                           <p className="icon-title">议价中</p>
                       </a>
                       <a className="bid-history"  href="/home_bargin.html">
                           <p className="icon"><img src={require('../../assets/images/per_ic_bar-h@2x.png')} alt=""/></p>
                           <p className="icon-title">出价历史</p>
                       </a>
                       <a className="bid-success"  href="/home_bargin.html">
                           <p className="icon"><img src={require('../../assets/images/per_ic_bar-s@2x.png')} alt=""/></p>
                           <p className="icon-title">议价成功</p>
                       </a>
                   </div>
               </div>
               <div className="operations">
                   <div className="title">实用操作</div>
                   <div className="content">
                       <a className="case">
                           <p className="icon iconfont icon-baozhengjin"></p>
                           <p className="icon-title">保证金充值</p>
                       </a>
                       <a className="record">
                           <p className="icon iconfont icon-jilu"></p>
                           <p className="icon-title">充值记录</p>
                       </a>
                       <a className="addr">
                           <p className="icon iconfont icon-dizhi"></p>
                           <p className="icon-title">收获地址</p>
                       </a>
                       <a className="pwd">
                           <p className="icon iconfont icon-ai-password"></p>
                           <p className="icon-title">修改密码</p>
                       </a>
                   </div>
                   <div className="content">
                       <a className="refund">
                           <p className="icon iconfont icon-tuikuan"></p>
                           <p className="icon-title">保证金退款</p>
                       </a>
                       <a className="record-refund">
                           <p className="icon iconfont icon-jilu1"></p>
                           <p className="icon-title">退款记录</p>
                       </a>
                       <a className="delgate">
                           <p className="icon iconfont icon-weituo"></p>
                           <p className="icon-title">委托记录</p>
                       </a>
                       <a className="help">
                           <p className="icon iconfont icon-bangzhuzhongxin"></p>
                           <p className="icon-title">帮助中心</p>
                       </a>
                   </div>
               </div>
               <div className="ad">
                   <img src={require('../../assets/images/per_bg_s@2x.png')} alt=""/>
                       <div className="title">商城xxx正在热卖，前往购买</div>
               </div>
               <div className="log">
                   退出登录
               </div>
           </div>
        )
    }
}