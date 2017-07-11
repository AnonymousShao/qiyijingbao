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
import {getAuctionDetail, getLatestPrice, submitAuctionWorkPrice,
    getBidRecord, getComments } from '../../../helper/http/auction'
import { getSimilar } from '../../../helper/http'
import { getParameterByName, toThousands } from '../../../helper/query_string'
import { imageHost } from '../../../helper/config'
import { bidRule, commissionRule } from '../../../helper/validatorX'
import Pricing from './pricing'

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
        priceLimit: [],
        consultInfo: {},
        workInfo: {},
        similarList: [],
        bidRecord: [],
        latest: {},
        nowPrice: '',
        startPrice: '',
        bidPrice: '',
        multiTime: 1,
        no: getParameterByName('no')
    }

    style = {
        backgroundColor: 'white',
        height: 50
    }

    handleClick(view){
        this.setState({view})
    }

    componentDidMount(){
        if(!this.state.no){
            alert('无参数，非法请求！')
            return
        }
        this.retrieveLatestData = this.retrieveLatestData.bind(this)

        getAuctionDetail({no: this.state.no}).then(data=>{
            if(data){
                this.setState({
                    imgList: data.AuctionWorkImg,
                    consultInfo: data.AuctionConsultInfo[0],
                    workInfo: data.AuctionoWorkInfo[0],
                    priceLimit: data.Strategy.PriceLimitList,
                    startPrice: data.AuctionoWorkInfo[0].StartPrice,
                    nowPrice: data.AuctionoWorkInfo[0].NowPrice
                })
                let similarParams = {
                    ref_workclassno: data.AuctionoWorkInfo[0].WorkClassNo
                }
                getSimilar(similarParams).then(data=>{
                    if(!data){return}
                    this.setState({
                        similarList: data.ArtistExponent
                    })
                    this.retrieveLatestData()
                })

                let recordParms = {
                    AuctionNO: data.AuctionoWorkInfo[0].AuctionNO,
                    AuctionWorkNO: this.state.no
                }
                getBidRecord(recordParms).then(data=>{
                    if(data){
                        this.setState({
                            bidRecord: data.AuctionWorkBidList
                        }, e=>this.refs.record.setHeight())
                    }
                })

                let commentParams = {
                    auctionWorkNo: this.state.no
                }
                getComments(commentParams).then(data=>{
                    if(data){
                        debugger
                    }
                })

            }
        })
    }

    retrieveLatestData(){
        let params = {
            workno: this.state.no
        }
        getLatestPrice(params).then(data=>{
            const latest = JSON.parse(data.NowPrice)
            this.setState({
                latest,
                nowPrice: latest.NowPrice,
                bidPrice: latest.NowPrice + bidRule(latest.StartPrice, this.state.priceLimit)
            })
            setTimeout(this.retrieveLatestData, 2000)
        })
    }

    changeBidPrice(bidPrice, time){
        this.setState({
            bidPrice,
            multiTime: time
        })
    }

    biding(){
        let params = {
            AuctionNO: this.state.workInfo.AuctionNO,
            StartPrice: this.state.workInfo.StartPrice,
            AuctionWorkNO: this.state.no,
            Amount: this.state.bidPrice,
            IntMultipleAuction: this.state.multiTime,
            IsCopper: this.state.workInfo.IsCopper,
        }
        submitAuctionWorkPrice(params).then(data=>{
            if(data){
                this.refs.pricing.hideDialog()
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

                {/* 产品专员 */}

                <Specialist {...this.state.consultInfo}/>

                {/* 操作按钮 */}

                <div className="board-container">
                    <Actions />
                </div>

                {/* 价格详情 */}

                <div className="board-container brt" >
                        <p className="price-info__price">起拍价: ￥ {toThousands(this.state.startPrice)}</p>
                        <p className="price-info__price">保证金: ￥ 3000</p>
                        <p className="price-info__now">当前价/成交价: ￥ {toThousands(this.state.nowPrice)}</p>
                </div>
                <div className="board-container brt" style={{marginBottom: 10}}>
                    <div className="price-info">
                        <span>
                            <img className="price-info__icon" src={require('../../../assets/images/auction/ic_floor.png')} alt=""/>
                            <span className="price-info__text">无保留价</span>
                        </span>
                        <span>
                            <img className="price-info__icon" src={require('../../../assets/images/auction/ic_commision.png')} alt=""/>
                            <span className="price-info__text">佣金{100 * commissionRule(this.state.startPrice)}%</span>
                        </span>
                        <span>
                            <img className="price-info__icon" src={require('../../../assets/images/auction/ic_bail.png')} alt=""/>
                            <span className="price-info__text">允许预缴保证金</span>
                        </span>
                        <span>
                            <img className="price-info__icon" src={require('../../../assets/images/auction/ic_delist.png')} alt=""/>
                            <span className="price-info__text">允许摘牌</span>
                        </span>
                    </div>
                </div>

                {/* 相似 */}

                <Similar list={this.state.similarList}/>

                {/* 出价记录以及评价区 */}

                <Accordion title="竞价指南（含视频演示）" />

                <Accordion title="出价记录" isDefaultShow='' ref="record">
                    <div className="pricing">
                        <ul>
                            {this.state.bidRecord.filter(record=>record.Account && record.rid!==3).map(record=>(
                                <li className="pricing-item">
                                    <span>{record.Account}</span>
                                    <span>领先</span>
                                    <span>{new Date(record.AuctionTime).toLocaleDateString()}</span>
                                    <span>￥ {toThousands(record.Amount)}</span>
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

                <Pricing
                    ref="pricing"
                    changePrice={this.changeBidPrice.bind(this)}
                    bidPrice={this.state.bidPrice}
                    priceLimit={this.state.priceLimit}
                    biding={this.biding.bind(this)}
                    nowPrice={this.state.nowPrice}
                />
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
