import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { ButtonClassic } from '../../components/button'
import { getParameterByName } from '../../helper/query_string'
import classnames from 'classnames'
import './style.scss'

class Main extends Component{

    state={
        type: '1',
        amount: getParameterByName('amount')
    }

    componentDidMount(){
        if(!this.state.amount){
            alert('缺少金额参数！')
        }
    }

    render(){
        const wxpayClass = classnames('iconfont', 'main-color', 'fr', {
            'icon-danxuankuangxuanzhong': this.state.type === '1',
            'icon-danxuankuangweixuan': this.state.type !== '1'
        }),
        unionpayClass = classnames('iconfont', 'main-color', 'fr', {
            'icon-danxuankuangxuanzhong': this.state.type === '2',
            'icon-danxuankuangweixuan': this.state.type !== '2'
        }),
        offlineClass = classnames('iconfont', 'main-color', 'fr', {
            'icon-danxuankuangxuanzhong': this.state.type === '3',
            'icon-danxuankuangweixuan': this.state.type !== '3'
        })

        return (
            <div>
                <div className="board-container">
                    <p>您当前身份为：<strong>天宝VIP会员</strong></p>
                    <p>您可享受首次缴纳保证金减免500元的优惠。</p>
                </div>
                <ul className="choose-board">
                    <li className="choose-board__title">本次您需要支付的金额为：RMB {this.state.amount}</li>
                    <li className="choose-board__content" onClick={e=>this.setState({type: '1'})}>
                        <i className="iconfont wxpay-icon icon-weixinzhifu" />
                        <span>微信支付</span>
                        <i className={wxpayClass} />
                    </li>
                    <li className="choose-board__content" onClick={e=>this.setState({type: '2'})}>
                        <img className="unionpay-icon" src={require('../../assets/images/unionPay.png')} alt=""/>
                        <span>银联支付</span>
                        <i className={unionpayClass} />
                    </li>
                    <li className="choose-board__content" onClick={e=>this.setState({type: '3'})}>
                        <i className="iconfont icon-yhq offline-icon"/>
                        <span>线下汇款</span>
                        <i className={offlineClass} />
                    </li>
                </ul>
                <div style={{padding: '60px 47px'}}>
                    <ButtonClassic>确认支付 RMB {this.state.amount}</ButtonClassic>
                </div>
            </div>
        )
    }
}


const Root = () => {
    return (
        <div>
            <Header />
            <Main/>
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
