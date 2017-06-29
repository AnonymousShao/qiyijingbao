import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button, ButtonArea, Dialog } from '../../components/button'
import Accordion from "../../components/accordion/index";
import Artists from "./artists";
import Exhibition from "./exhibition";
import Graphics from "./graphic";

import './style.scss'
import Carousel from "../../components/carousel/index";
import {Type5} from "../../components/Image_text_items/index";
import {Popup} from "../../components/button";


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
            <div>
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
                        <img style={{width: 45}} src={require('../../assets/images/img_source/img_5.png')} alt=""/>
                        <h3>黄小和</h3>
                        <p>xiaohe huang</p>
                    </div>
                    <div>
                        <p><span>职称:</span><span> 高级产品专员</span></p>
                        <p><span>联络专线:</span><span> 400-120332-23</span></p>
                        <p><span>值班时间:</span><span> 8:00 - 17:00</span></p>
                    </div>
                </Dialog>
                <div className="product-specialist__board" onClick={e=>this.setState({show: true})}>
                    <img src={require('../../assets/images/img_source/img_5.png')} alt=""/>
                    <span className="product-specialist" >产品专员 张淑芬</span>
                </div>
            </div>
        )
    }
}

class SimilarDetail extends Component{

    render(){
        return (
            <div style={{height: document.documentElement.clientHeight * 0.6, overflow: 'auto', backgroundColor:'#f8f8f8'}}>
                <div style={{backgroundColor: 'white', marginBottom: 10}}>
                    <p className="center-title__wrap" style={{padding: '6px 0'}}>
                        <strong className="center-title">价格参考</strong>
                    </p>
                    <div>
                        <img style={{width: '100%'}} src={require('../../assets/images/img_source/img_1.png')} alt=""/>
                    </div>
                    <div className="">
                        <h3 style={{color: '#222222', fontWeight: 'normal'}}>作者：刘海粟 当代</h3>
                        <h4 style={{color: '#666666', fontSize: '0.9rem'}}>题材：山水 青绿山水</h4>
                        <p style={{color: '#666666' ,fontSize: '0.9rem'}}>简介：刘海粟（1896-1994），名槃，字季芳，号海翁。汉族，江苏常州人。现代杰出画家、美术教育家。1912年与乌始光、张聿光等创办上海图画美术院，后改为上海美术专科学校，任校长。1949年后任南京艺术学…</p>
                    </div>
                </div>

                <div style={{backgroundColor: 'white'}}>
                    <p className="center-title__wrap" style={{padding: '6px 0'}}>
                        <strong className="center-title">刘海粟作品价格曲线图</strong>
                    </p>
                    <Graphics/>
                </div>
            </div>
        )
    }
}

class Similar extends Component{

    settings = {
        infinite: false,
        autoplay: false,
        autoplaySpeed: 4000,
        slidesToShow: 3.3,
        slidesToScroll: 4,
        initialSlide: 0,
        lazyLoad: true
    }

    state = {
        popupShow: false
    }

    test(){
        this.setState({popupShow: false})
    }

    render(){
        return (
            <div className="board-container" style={{marginBottom: 10}}>
                <p className="center-title__wrap">
                    <strong className="center-title">同类题材出价参考</strong>
                </p>
                <Carousel settings={this.settings}>
                    {[1,2,3,4,5,6].map(i=>(<div>
                        <span onClick={e=>this.setState({popupShow: true})}><Type5/></span>
                    </div>))}
                </Carousel>
                <Popup show={this.state.popupShow} onClick={this.test.bind(this)}>
                    <SimilarDetail/>
                </Popup>
            </div>
        )
    }
}

class Main extends Component{

    state = {
        view: 'exhibition',
    }

    style = {
        backgroundColor: 'white',
        height: 50
    }

    handleClick(view){
        this.setState({view})
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
                {(this.state.view==='exhibition'||this.state.view==='artists')?<Exhibition />:null}
                {this.state.view==='artists'?<Artists artistNo="A20170419153051"/>:null}
                {this.state.view==='graphic'?<Graphics />:null}

                <div className="board-container auction-info-board">
                    <p className="remaining">距结束 <span>1天</span></p>
                    <h2 className="title">
                        <span>lot 2001 中国山水</span>
                        <span className="fr remainder">收藏</span>
                    </h2>
                    <p className="name">刘克明</p>
                    <p className="info">60*10 120平方尺</p>
                    <p className="info">设色纸本 立轴 2006年作</p>
                    <p className="price">估价： ￥20,000-</p>
                </div>

                <Specialist/>

                <div className="board-container" style={{marginBottom: 10}}>
                    <Actions />
                </div>

                <Similar/>

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
                        <img src={require('../../assets/images/img_source/img_3.png')} alt=""/>
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
