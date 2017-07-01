import React, {Component} from 'react'
import { imageHost } from '../../helper/config'
import './style.scss'
import {toThousands} from '../../helper/query_string'


export class Type1 extends Component{

    render(){
        return (
            <li className="img-text__container">
                <div className="image_container ic90">
                    <img src={imageHost + this.props.APPImgUrl} alt=""/>
                </div>
                <div className="text_container">
                    <h3 className="main-name">{this.props.Title}</h3>
                    <p className="information">艺术家 · 类目 · 类别</p>
                    <p className="information">专场名称</p>
                    <p className="im-tip">
                        <span>99次出价</span>
                        <span>{this.props.BrowseCount}次围观</span>
                    </p>
                </div>
            </li>
        )
    }
}


export class Type2 extends Component{

    render(){
        return (
            <li className="img-text__container">
                <div className="image_container ic90">
                    <img src={this.props.img} alt=""/>
                </div>
                <div className="text_container">
                    <h3 className="main-name">{this.props.name}</h3>
                    <p className="information">艺术家 · 类目 · 类别</p>
                    <p className="information">&nbsp;</p>
                    <p className="im-tip">
                        <span>99次出价</span>
                        <span>899次围观</span>
                    </p>
                </div>
            </li>
        )
    }
}


export class Type3 extends Component{

    render(){
        return (
            <li className="img-text__container">
                <a href={"/artist_detail.html?artistno=" + this.props.NO}>
                    <div className="image_container ic75">
                        <img src={imageHost + this.props.HeadImgUrl} alt=""/>
                    </div>
                    <div className="text_container">
                        <h3 className="main-name">{this.props.Name}</h3>
                        <p className="information">{this.props.ArtistCode}</p>
                        <p className="desc">{this.props.Description}</p>
                    </div>
                </a>
            </li>
        )
    }
}


export class Type4 extends Component{

    render(){
        return (
            <li className="img-text__container">
                <a href={"/auction_detail.html?no=" + this.props.AuctionWorkNO}>
                    <div className="image_container ic90">
                        <img src={imageHost + this.props.APPImgUrl} alt=""/>
                    </div>
                    <div className="text_container">
                        <h3 className="main-name">{this.props.WorkClassName} <span className="fc-weak">({this.props.ArtistName})</span></h3>
                        <p className="sub-name">{this.props.Title}</p>
                        <p className="price">
                            估价 <span> RMB {toThousands(this.props.MinEvaluationPrice)} - {toThousands(this.props.MaxEvaluationPrice)}</span>
                        </p>
                        <p className="tip-ft"><strong>{this.props.AuctionCount}</strong>次出价</p>
                    </div>
                </a>
            </li>
        )
    }
}


/*
* 上图下文 出价参考
* */
export class Type5 extends Component{

    render(){
        debugger
        return (
            <div className="type5__container">
                <a href="/bid_refer.html">
                    <div className="image_container">
                        <img src={require('../../assets/images/img_source/img_12.png')} alt=""/>
                        <div className="image_band">{Math.random().toFixed(5)}</div>
                    </div>
                    <div className="text_container">
                        <p className="main-name">刘克明</p>
                        <p className="price">1,100 - 4,400</p>
                    </div>
                </a>
            </div>
        )
    }
}