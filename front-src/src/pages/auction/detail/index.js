import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import { Button, ButtonArea, Dialog } from '../../../components/button/index'
import Accordion from "../../../components/accordion/index";
import Artists from "./artists";
import Exhibition from "./exhibition";
import Graphics from "../../../components/graphics/index";
import './style.scss'
import Similar from '../../../components/similar'
import {getAuctionDetail, getLatestPrice, submitAuctionWorkPrice,
    getBidRecord, getComments, postComment } from '../../../helper/http/auction'

import { getArtistDataList } from '../../../helper/http/artist'

import { getSimilar } from '../../../helper/http'
import { getParameterByName, toThousands, calcTime } from '../../../helper/query_string'
import { imageHost } from '../../../helper/config'
import { bidRule, commissionRule } from '../../../helper/validatorX'
import Pricing from './pricing'
import BottomUp from "../../../components/bottom_input/index";
import { TextArea } from '../../../components/button'
import Modal, {Share} from "../../../components/modal/index";

class Actions extends Component{

    state={
        showShare: false
    }
    handleClick(){
        console.log(1)
    }

    render(){
        return (
            <div>
                <ButtonArea direction="horizontal">
                    <Button size="small" type='primary'
                            onClick={e=>window.location.href='/docs_notice.html'}>竞拍须知</Button>
                    <Button size="small" type='default'
                            onClick={e=>window.location.href='/auction_info.html?no='+this.props.info.WorkNO}>拍品详情</Button>
                    <Button size="small" type='default'
                            onClick={e=>this.setState({showShare: true})}>分享给朋友</Button>
                </ButtonArea>
                <Share
                    onClose={e=>this.setState({showShare: false})}
                    show={this.state.showShare} />
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

    constructor(props){
        super(props)
        this.getComment = this.getComment.bind(this)
        this.showComment = this.showComment.bind(this)
        this.postComment = this.postComment.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    state = {
        view: 'exhibition',
        imgList: [],
        priceLimit: [],
        consultInfo: {},
        workInfo: {},
        similarList: [],
        ArtistExponent: [],
        bidRecord: [],
        latest: {},
        nowPrice: '',
        startPrice: '',
        bidPrice: '',
        multiTime: 1,
        no: getParameterByName('no'),
        comment: '',
        commentList: [],
        showGroup: false,
        showShare: false,
        isFinished: false,
        IsCopper: false,
        IsAllowCopper: true,
        remainingTime: null
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
                    nowPrice: data.AuctionoWorkInfo[0].NowPrice,
                    IsCopper: data.AuctionoWorkInfo[0].IsCopper,
                    IsAllowCopper: data.AuctionoWorkInfo[0].IsAllowCopper,
                    isFinished: data.AuctionoWorkInfo[0].AuctionStatus===3
                })
                let similarParams = {
                    ref_workclassno: data.AuctionoWorkInfo[0].WorkClassNo
                }
                getSimilar(similarParams).then(data=>{
                    if(!data) return
                    this.setState({
                        similarList: data.ArtistExponent
                    })
                    this.retrieveLatestData()
                })

                let recordParams = {
                    AuctionNO: data.AuctionoWorkInfo[0].AuctionNO,
                    AuctionWorkNO: this.state.no
                }
                getBidRecord(recordParams).then(data=>{
                    if(data){
                        this.setState({
                            bidRecord: data.AuctionWorkBidList
                        }, e=>this.refs.record.setHeight())
                    }
                })

                let artistParams = {
                    artistno: data.AuctionoWorkInfo[0].ArtistNO
                }

                getArtistDataList(artistParams).then(data=>{
                    if(data){
                        this.setState({
                            ArtistExponent: data.ArtistExponent
                        })
                    }
                })

                this.getComment()

                this.calculateRemainingTime()
            }
        })
    }

    calculateRemainingTime(){
        if(this.state.remainingTime===null || this.state.remainingTime>=0){
            this.setState({
                remainingTime: new Date(this.state.workInfo.EndTime) - new Date()
            })
        }
        if(this.state.remainingTime<=0){
            this.setState({
                remainingTime: 0,
                isFinished: true,
            })
        }
        setTimeout(()=>this.calculateRemainingTime(), 1000)
    }

    retrieveLatestData(){
        if(this.state.isFinished) return
        let params = {
            workno: this.state.no
        }
        getLatestPrice(params).then(data=>{
            const latest = data.NowPrice

            if(this.state.workInfo.AuctionStatus===2 && this.state.workInfo.IsCopper){
                this.setState({isFinished: true})
            }

            this.setState({
                latest,
                IsCopper: latest.IsCopper,
                nowPrice: latest.NowPrice,
                bidPrice: this.state.bidPrice ||latest.NowPrice + bidRule(latest.StartPrice, this.state.priceLimit)
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
        return submitAuctionWorkPrice(params)
    }

    showComment(){
        this.refs.comment.show()
    }

    getComment(){
        let commentParams = {
            auctionWorkNo: this.state.no
        }
        getComments(commentParams).then(data=>{
            if(data){
                this.setState({
                    commentList: data.data
                }, e=>this.refs.commentList.setHeight())
            }
        })
    }

    postComment(){
        let params = {
            comment: this.state.comment,
            referenceNo: this.state.no,
            workNo: this.state.workInfo.workNo
        }
        postComment(params).then(data=>{
            this.refs.comment.hide()
            this.setState({comment: ''})
            this.getComment()
        })
    }

    handleInput(e){
        this.setState({
            comment: e.target.value
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
                {this.state.view==='graphic' && this.state.ArtistExponent.length
                    ?<Graphics ArtistExponent={this.state.ArtistExponent}/>
                    :null}

                <div className="board-container auction-info-board">
                    {this.state.isFinished
                        ?null
                        : <p className="remaining">距结束 <span>{calcTime(this.state.remainingTime)}</span></p>}
                    <h2 className="title">
                        <span>{this.state.workInfo.AuctionCode + ' ' + this.state.workInfo.Title}</span>
                        <span className="fr remainder">收藏</span>
                    </h2>
                    <p className="name">{this.state.workInfo.ArtistName}（b.{this.state.workInfo.Birthday}）</p>
                    <p className="info">{this.state.workInfo.Specifications}</p>
                    <p className="info">(假数据)设色纸本 立轴 {this.state.workInfo.CreationTime}作</p>
                    <p className="price">估价： RMB {toThousands(this.state.workInfo.MinEvaluationPrice)} - {toThousands(this.state.workInfo.MaxEvaluationPrice)}</p>
                </div>

                {/* 产品专员 */}

                <Specialist {...this.state.consultInfo}/>

                {/* 操作按钮 */}
                <div className="board-container">
                    <Actions info={this.state.workInfo}/>
                </div>

                {/* 价格详情 */}
                <div className="board-container brt" >
                        <p className="price-info__price">起拍价: ￥ {toThousands(this.state.startPrice)}</p>
                        <p className="price-info__now">{this.state.isFinished?'成交价':'当前价'}: RMB {toThousands(this.state.nowPrice)}</p>
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
                            <span className="price-info__text">{this.state.IsAllowCopper?'':'不'}允许摘牌</span>
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
                            {this.state.bidRecord.filter(record=>record.Account).map(record=>(
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

                <Accordion title="评论" isDefaultShow="" ref="commentList">
                    <div className="comment">
                        {this.state.commentList.length
                            ? <ul>
                                {this.state.commentList.map(li=>(
                                    <li className="comment-item">
                                        <div className="comment-head" />
                                        <div className="comment-body">
                                            <p>
                                                <span className="phone">{li.Account}</span>
                                                <span className="fr">{li.Remark ||0} 赞</span>
                                            </p>
                                            <p className="content">{li.CommentInfo}</p>
                                            <p className="time">{new Date(li.CommentTime).toLocaleDateString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            : <div>暂无评论</div>
                        }
                        <div className="comment-to-comment">
                            <Button size="small" type='primary' onClick={this.showComment}>我要评论</Button>
                        </div>
                    </div>
                </Accordion>

                <BottomUp
                    ref="comment"
                    title="我要评论"
                    onSubmit={this.postComment}
                >
                    <TextArea
                        value={this.state.comment}
                        onChange={this.handleInput}
                    />
                </BottomUp>

                <div className="accordion-title" onClick={e=>this.setState({showGroup: true})}>
                    进入社区
                </div>
                <Modal
                    show={this.state.showGroup}
                    onClose={e=>this.setState({showGroup: false})}
                >
                    <div style={{padding: '60px 30px', textAlign: 'center', color: 'white'}}>
                        <p>请长按二维码图片识别客服专员，</p>
                        <p>之后您将被添加到天宝艺术社群。</p>
                        <img style={{width: '60%', paddingTop: 30}} src={require('../../../assets/images/group_code@2x.jpg')} alt=""/>
                    </div>
                </Modal>

                <div className="brand-board">
                    <div className="img-container">
                        <img src={require('../../../assets/images/img_source/img_3.png')} alt=""/>
                    </div>
                    <h4 className="title">委托机构: 奇艺天宝</h4>
                    <p className="rate">好评率：99%</p>
                </div>

                <Pricing
                    isFinished={this.state.isFinished}
                    ref="pricing"
                    changePrice={this.changeBidPrice.bind(this)}
                    priceLimit={this.state.priceLimit}
                    biding={this.biding.bind(this)}
                    nowPrice={this.state.nowPrice}
                    IsAllowCopper={this.state.IsAllowCopper}
                    startPrice={this.state.startPrice}
                    bidPrice={this.state.bidPrice}
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
