import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonArea, Dialog } from '../../../components/button'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Exhibition from '../../auction/detail/exhibition'
import Artist from './artist'
import Graphics from './graphics'

import { toThousands } from '../../../helper/query_string'
import { getWork } from '../../../helper/http/bargain'
import Similar from '../../../components/similar'

import { getSimilar } from '../../../helper/http'
import Accordion from "../../../components/accordion/index";
import {Type6} from "../../../components/Image_text_items/index";

require('./style.scss')



class Actions extends Component{

    handleClick(){
        console.log(1)
    }

    render(){
        return (
            <ButtonArea direction="horizontal">
                <Button size="small" type='primary'
                        onClick={this.handleClick.bind(this, 'notice')}>精品·腔调</Button>
                <Button size="small" type='default'
                        onClick={this.handleClick.bind(this, 'news')}>低价快抢</Button>
                <Button size="small" type='default'
                        onClick={e=>window.location.href='bargain_entrust.html'}>委托鉴定</Button>
            </ButtonArea>
        )
    }
}

class Pricing extends Component{

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
                    label: 'Cancel',
                    onClick: this.hideDialog.bind(this)
                },
                {
                    type: 'primary',
                    label: 'Ok',
                    onClick: this.hideDialog.bind(this)
                }
            ]
        }
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
        return (
            <div className="page-pricing-container">
                <Dialog
                    show={this.state.view==='bid'}
                    buttons={this.state.bid.buttons}>
                    <div style={this.style.title}>
                        <p>当前最高价：<span className="main-color">RMB 1000</span></p>
                        <p>您的出价:</p>
                    </div>
                    <div style={this.style.body}>
                        <p style={this.style.item}>
                            <input type="checkbox"/>
                            <span style={this.style.itemPrice}>RMB 2000</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="checkbox"/>
                            <span style={this.style.itemPrice}>RMB 3000</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="checkbox"/>
                            <span style={this.style.itemPrice}>RMB 4000</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="checkbox"/>
                            <span style={this.style.itemPrice} className="main-color">RMB 9000 一口价摘牌</span>
                        </p>
                    </div>
                    <p style={this.style.tip}>竞拍成功后必须支付佣金N%</p>
                </Dialog>
                <div className="auction-action">
                    <span className="action-tel">400-885-1666</span>
                    <span className="action-2">缴纳保证金</span>
                    <span className="action-3" onClick={e=>this.setState({view: 'bid'})}>我要出价</span>
                </div>
            </div>
        )
    }
}

class Main extends Component{
    constructor(props){
        super(props)
    }

    state = {
        view: 'exhibition',
        imgList: [],
        workInfo: {},
        similarList: []
    }

    componentDidMount(){
        let params = {
            bargainworkno: '20170703135402'
        }
        getWork(params).then(data=>{
            if(data){
                this.setState({
                    workInfo: data.BargainWorkDetail[0],
                    imgList: data.BargainWorkImg
                })
                let similarParams = {
                    ref_workclassno: data.BargainWorkDetail[0].WorkClassNo,
                    // ref_workclassno: '1000'
                }
                getSimilar(similarParams).then(data=>{
                    if(!data){return}
                    this.setState({
                        similarList: data.ArtistExponent
                    })
                })
            }
        })
    }

    handleClick(type){
        this.setState({
            view: type
        })
    }

    handleChangeClass(){

    }

    handleSelectChange(){
        debugger
    }

    handleInputChange(){
        debugger
    }

    submit(){
        debugger
    }

    handleUpDownChange(){

    }

    render(){
        return (
            <div>
                <div className="main__menu-wrap">
                    <span className={"main__menu-btn " + (this.state.view==='exhibition'?'active':'')}
                          onClick={this.handleClick.bind(this, 'exhibition')}
                    >作品展示</span>
                    <span className={"main__menu-btn " + (this.state.view==='artist'?'active':'')}
                          onClick={this.handleClick.bind(this, 'artist')}
                    >艺术家介绍</span>
                    <span className={"main__menu-btn " + (this.state.view==='graphic'?'active':'')}
                          onClick={this.handleClick.bind(this, 'graphic')}
                    >成交曲线</span>
                </div>
                {((this.state.view==='exhibition'||this.state.view==='artist')&&this.state.imgList.length)
                    ?<Exhibition list={this.state.imgList}/>
                    :null}
                {this.state.view==='artist'?<Artist artistNo={this.state.workInfo.ArtistNO}/>:null}
                {this.state.view==='graphic'?<Graphics />:null}

                <div className="board-container bargain-info-board">
                    <p className="remaining">距结束 <span>1天</span></p>
                    <h2 className="title">
                        <span>lot 2001 中国山水</span>
                        <span className="fr remainder">收藏</span>
                    </h2>
                    <p className="name">{this.state.workInfo.ArtistName}</p>
                    <p className="info">{this.state.workInfo.Specifications}</p>
                    <p className="info">(假数据)设色纸本 立轴 2006年作</p>
                    <p className="eva-price">起议价: RMB {toThousands(this.state.workInfo.LowestBargainPrice)} <br/>
                    买家佣金金: RMB {toThousands(11111)}</p>
                    <p className="price">估价: 估价待询</p>
                </div>

                <div className="info-actions mb10">
                    <div>
                        <img src={require('../../../assets/images/bargain/bar_ic_ntk.png')} alt=""/>
                        <p className="title">议价须知</p>
                    </div>
                    <div>
                        <img src={require('../../../assets/images/bargain/bar_ic_details.png')} alt=""/>
                        <p className="title">作品详情</p>
                    </div>
                    <div>
                        <img src={require('../../../assets/images/bargain/bar_ic_his.png')} alt=""/>
                        <p className="title">历史成交</p>
                    </div>
                    <div>
                        <img src={require('../../../assets/images/bargain/bar_ic_com.png')} alt=""/>
                        <p className="title">产品专员</p>
                    </div>
                    <div>
                        <img src={require('../../../assets/images/bargain/bar_ic_ass.png')} alt=""/>
                        <p className="title">加入社群</p>
                    </div>
                </div>

                <Similar list={this.state.similarList}/>

                <div>
                    <Accordion title="出价记录">
                        <div className="pricing">
                            <ul>
                                {[1,2,3,4,5].map(i=>(
                                    <li className="pricing-item">
                                        <span>1232132312312</span>
                                        <span>领先</span>
                                        <span>{new Date().toLocaleDateString()}</span>
                                        <span>￥ 1,800</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pricing-nomore">没有更多了</div>
                        </div>
                    </Accordion>

                    <Accordion title="评论" isDefaultShow="">
                        <div className="comment">
                            <ul>
                                {[1,2,3,4].map(i=>(
                                    <li className="comment-item">
                                        <div className="comment-head" />
                                        <div className="comment-body">
                                            <p>
                                                <span className="phone">13110789999</span>
                                                <span className="fr">102</span>
                                            </p>
                                            <p className="content">这件拍品不错啊，各位老师让给我呗，谢谢。</p>
                                            <p className="time">{new Date().toLocaleDateString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="comment-to-comment">
                                <Button size="small" type='primary'>我要评论</Button>
                            </div>
                        </div>
                    </Accordion>

                </div>

                <div className="board-container mb10
               " >
                    <Actions/>
                </div>

                <div>
                    <Type6 />
                </div>

                <Pricing/>

            </div>
        )
    }
}

const Root = () => (
    <div>
        <Header />
        <Main />
        <Footer active="bargain"/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
