import React, {Component} from 'react'
import './style.scss'
import {imageHost} from '../../helper/config'
import {toThousands} from '../../helper/query_string'

export default class CardBoard extends Component{

    render(){
        return (
            <div className="t-card-container">
                {this.props.cardlist.map(card=>(
                    <div className="t-card">{
                        this.props.type==='2'
                            ?<CardItem2 {...card}/>
                            :<CardItem {...card}/>}
                    </div>
                ))}
            </div>
        )
    }
}


class CardItem extends Component{
    render(){
        return (
            <div>
                <a href={"/bid_refer.html?workno=" + (this.props.WorkSimilarNo)}>
                    <div className="t-card-image" style={{backgroundImage: `url(${imageHost + this.props.WorkImgUrl})`}} >
                        <div className="t-card-band">{this.props.Theme}</div>
                    </div>
                    <div className="t-card-body">
                        <p className="dot">艺术家:{this.props.ArtistName}</p>
                        <p className="dot">年代: {this.props.ArtistBirthYear} - {this.props.ArtistDeathYear}</p>
                        <p className="price-title dot">估价</p>
                        <p className="price">{toThousands(this.props.MinEvaluationPrice)} - {toThousands(this.props.MaxEvaluationPrice)}</p>
                    </div>
                </a>
            </div>
        )
    }
}

class CardItem2 extends Component{
    render(){
        return (
            <div>
                <a href={"/bargain_detail.html?no=" + (this.props.NO)}>
                    <div className="t-card-image" style={{backgroundImage: `url(${imageHost + this.props.APPImgUrl})`}} >
                        <div className="t-card-band">{this.props.BargainCode + this.props.Title}</div>
                    </div>
                    <div className="t-card-body">
                        <p className="dot">最高出价:{this.props.ArtistName}</p>
                        <p className="price-title dot">估价</p>
                        <p className="price">{toThousands(this.props.MinEvaluationPrice)} - {toThousands(this.props.MaxEvaluationPrice)}</p>
                        <p className="dot">
                            <span>{this.props.ArtistName}（b.{this.props.Birthday}）</span>
                            <span className="fr bargaining-btn">出价</span>
                        </p>
                    </div>
                </a>
            </div>
        )
    }
}