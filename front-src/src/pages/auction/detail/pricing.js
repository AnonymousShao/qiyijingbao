import React, {Component} from 'react'
import { Dialog } from '../../../components/button/index'
import { toThousands } from '../../../helper/query_string'
import { bidRule, commissionRule } from '../../../helper/validatorX'

export default class Pricing extends Component{

    hideDialog(){
        this.setState({
            view: ''
        })
    }

    state = {
        view: '',
        bid: {
            title: 'Heading',
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: ()=>{
                        this.hideDialog()
                    }
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: ()=>{
                        this.setState({
                            view: 'confirm'
                        })
                    }
                }
            ]
        },
        confirm: {
            title: '',
            buttons: [{
                type: 'default',
                label: '取消',
                onClick: ()=>{
                    this.setState({
                        view: 'bid'
                    })
                }
            }, {
                type: 'primary',
                label: '确定',
                onClick: ()=>{
                    this.props.biding().then(data=>{
                        debugger
                    })
                }
            }]
        }
    }

    componentDidMount(){
        // this.setState({
        //     bidPrice: parseInt(this.props.price)
        // })
    }

    componentWillReceiveProps(nextProps){
        // if(!this.state.bidPrice){
        //     this.setState({
        //         bidPrice: nextProps.price.StartPrice + bidRule(nextProps.price.StartPrice, this.props.priceLimit)
        //     })
        // }
    }

    changeBid(myPrice, time){
        this.props.changePrice(myPrice, time)
    }

    style = {
        title: {
            padding: 5,
            textAlign: 'center'
        },
        body: {
            paddingBottom: 10
        },
        item: {
            lineHeight: 1.6,
            fontSize: '0.9rem',
        },
        itemPrice: {
            paddingLeft: 10
        },
        tip: {
            fontSize: '0.6rem',
            color: '#999',
        }
    }

    render(){
        const commission = bidRule(this.props.nowPrice, this.props.priceLimit),
            start = parseInt(this.props.nowPrice);
        return (
            <div className="page-pricing-container">
                <Dialog
                    show={this.state.view==='bid'}
                    buttons={this.state.bid.buttons}>
                    <div style={this.style.title}>
                        <p>当前最高价：<span className="main-color">RMB {toThousands(start)}</span></p>
                        <p>您的出价:</p>
                    </div>
                    <div style={this.style.body}>
                        <p style={this.style.item}>
                            <label>
                                <input type="radio" name="price" value={(start + commission).toString()}
                                       checked={this.props.bidPrice===(start + commission)}
                                       onChange={this.changeBid.bind(this, start + commission, 1)} />
                                <span style={this.style.itemPrice}>RMB {toThousands(start + commission)}</span>
                            </label>
                        </p>
                        <p style={this.style.item}>
                            <input type="radio" name="price" value={(start + 2 * commission).toString()}
                                   checked={this.props.bidPrice===(start + 2 * commission)}
                                   onChange={this.changeBid.bind(this, start + 2 * commission, 2)} />
                            <span style={this.style.itemPrice}>RMB {toThousands(start + 2 * commission)}</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="radio" name="price" value={(start + 3 * commission).toString()}
                                   checked={this.props.bidPrice===(start + 3 * commission)}
                                   onChange={this.changeBid.bind(this, start + 3 * commission, 3)} />
                            <span style={this.style.itemPrice}>RMB {toThousands(start + 3 * commission)}</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="radio" name="price" value={(start + 5 * commission).toString()}
                                   checked={this.props.bidPrice===(start + 5 * commission)}
                                   onChange={this.changeBid.bind(this, start + 5 * commission, 5)} />
                            <span style={this.style.itemPrice} className="main-color">RMB {toThousands(start + 5 * commission)} 一口价摘牌</span>
                        </p>
                    </div>
                    <p style={this.style.tip}>竞拍成功后必须支付佣金{commissionRule(start) * 100}%</p>
                </Dialog>

                <Dialog
                    show={this.state.view === 'confirm'}
                    buttons={this.state.confirm.buttons}
                >
                    <div>
                        确认出价RMB{toThousands(this.state.bidPrice)}?
                    </div>
                </Dialog>

                <div className="auction-action">
                    <span className="action-tel">400-885-1666</span>
                    <a href="/secure_page.html" className="action-2">缴纳保证金</a>
                    <span className="action-3" onClick={e=>this.setState({view: 'bid'})}>我要出价</span>
                </div>
            </div>
        )
    }
}
