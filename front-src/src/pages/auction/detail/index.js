import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import { Button, ButtonArea, Dialog } from '../../../components/button/index'
import Accordion from "../../../components/accordion/index";
import Artists from "./artists";
import Exhibition from "./exhibition";
import Graphics from "./graphic";

import './style.scss'
import Similar from '../../../components/similar'
import {getAuctionDetail} from '../../../helper/http/auction'
import { getSimilar } from '../../../helper/http'
import { getParameterByName, toThousands } from '../../../helper/query_string'
import { imageHost } from '../../../helper/config'


class Actions extends Component{

    handleClick(){
        console.log(1)
    }

    render(){
        return (
            <ButtonArea direction="horizontal">
                <Button size="small" type='primary'
                        onClick={this.handleClick.bind(this, 'notice')}>竞拍须知</Button>
                <Button size="small" type='default'
                        onClick={this.handleClick.bind(this, 'news')}>竞拍资讯</Button>
                <Button size="small" type='default'
                        onClick={this.handleClick.bind(this, 'share')}>分享给朋友</Button>
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
                            <input type="radio" name="price" value='1'/>
                            <span style={this.style.itemPrice}>RMB 2000</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="radio" name="price" value='2'/>
                            <span style={this.style.itemPrice}>RMB 3000</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="radio" name="price" value='3'/>
                            <span style={this.style.itemPrice}>RMB 4000</span>
                        </p>
                        <p style={this.style.item}>
                            <input type="radio" name="price" value='4'/>
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


class Specialist extends Component{

    state = {
        show: false,
        buttons: [
            {
                type: 'default',
                label: '关闭',
                onClick: e=>this.setState({show: false})
            }
        ]
    }

    render(){
        return (
            <div>
                <Dialog show={this.state.show}
                        buttons={this.state.buttons}
                >
                    <div style={{textAlign: 'center', paddingBottom: 15}}>
                        <img style={{width: 45}} src={imageHost + this.props.Attache_HeadUrl} alt=""/>
                        <h3>{this.props.Attache_Name}</h3>
                        <p>{this.props.Attache_EnglishName}</p>
                    </div>
                    <div>
                        <p><span>职称:</span><span> {this.props.Attache_Post}</span></p>
                        <p><span>联络专线:</span><span> {this.props.Attache_Phone}</span></p>
                        <p><span>值班时间:</span><span> {this.props.Attache_Time}</span></p>
                    </div>
                </Dialog>
                <div className="product-specialist__board" onClick={e=>this.setState({show: true})}>
                    <img src={imageHost + this.props.Attache_HeadUrl} alt=""/>
                    <span className="product-specialist" >产品专员 {this.props.Attache_Name}</span>
                </div>
            </div>
        )
    }
}

class Main extends Component{

    state = {
        view: 'exhibition',
        imgList: [],
        consultInfo: {},
        workInfo: {},
        similarList: []
    }

    style = {
        backgroundColor: 'white',
        height: 50
    }

    handleClick(view){
        this.setState({view})
    }

    componentDidMount(){
        const no = getParameterByName('no')
        if(!no){
            alert('无参数，非法请求！')
            return
        }
        getAuctionDetail({no}).then(data=>{
            if(data){
                data = data.res_body
                this.setState({
                    imgList: data.AuctionWorkImg,
                    consultInfo: data.AuctionConsultInfo[0],
                    workInfo: data.AuctionoWorkInfo[0]
                })
                let similarParams = {
                    ref_workclassno: data.AuctionoWorkInfo[0].WorkClassNo
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

    render(){
        return (
            <div>
                <div className="main__menu-wrap">
                    <span className={"main__menu-btn " + (this.state.view==='exhibition'?'active':'')}
                          onClick={this.handleClick.bind(this, 'exhibition')}
                    >作品展示</span>
                    <span className={"main__menu-btn " + (this.state.view==='artists'?'active':'')}
                          onClick={this.handleClick.bind(this, 'artists')}
                    >艺术家介绍</span>
                    <span className={"main__menu-btn " + (this.state.view==='graphic'?'active':'')}
                          onClick={this.handleClick.bind(this, 'graphic')}
                    >成交曲线</span>
                </div>
                {((this.state.view==='exhibition'||this.state.view==='artists')&&this.state.imgList.length)
                    ?<Exhibition list={this.state.imgList}/>
                    :null}
                {this.state.view==='artists'?<Artists artistNo={this.state.workInfo.ArtistNO}/>:null}
                {this.state.view==='graphic'?<Graphics />:null}

                <div className="board-container auction-info-board">
                    <p className="remaining">距结束 <span>1天</span></p>
                    <h2 className="title">
                        <span>{this.state.workInfo.Title}</span>
                        <span className="fr remainder">收藏</span>
                    </h2>
                    <p className="name">{this.state.workInfo.ArtistName}</p>
                    <p className="info">{this.state.workInfo.Specifications}</p>
                    {/*<p className="info">(假数据)设色纸本 立轴 2006年作</p>*/}
                    <p className="price">估价： RMB {toThousands(this.state.workInfo.MinEvaluationPrice)} - {toThousands(this.state.workInfo.MaxEvaluationPrice)}</p>
                </div>

                <Specialist {...this.state.consultInfo}/>

                <div className="board-container" style={{marginBottom: 10}}>
                    <Actions />
                </div>

                <Similar list={this.state.similarList}/>

                <Accordion title="竞价指南（含视频演示）" />

                <Accordion title="出价记录" isDefaultShow=''>
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

                <div className="accordion-title">
                    进入社区
                </div>

                <div className="brand-board">
                    <div className="img-container">
                        <img src={require('../../../assets/images/img_source/img_3.png')} alt=""/>
                    </div>
                    <h4 className="title">委托机构: 奇艺天宝</h4>
                    <p className="rate">好评率：99%</p>
                </div>

                <Pricing/>
            </div>
        )
    }
}

const Root = () => {
    return (
        <div>
            <Header/>
            <Main/>
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
