import React, {Component} from 'react'
import {imageHost} from '../../helper/config'
import { getAuctionList } from '../../helper/http/auction'

export default class Schedule extends Component{

    state = {
        schedule: 'inAuction',
        AuctionList: []
    }

    handleChange(type){
        this.setState({
            schedule: type
        })
    }

    componentDidMount(){
        getAuctionList().then(data=>{
            if(data){
                this.setState({
                    AuctionList: data.AuctionList
                })
            }
        })
    }

    style = {
        container: {
            backgroundColor: 'white'
        }
    }

    render(){
        return (
            <div style={this.style.container}>
                <div className="head-btn-group">
                    <span className={'head-btn ' + (this.state.schedule==='inAuction'?'active':'')}
                          onClick={this.handleChange.bind(this, 'inAuction')}>竞拍日程</span>
                    <span className={'head-btn ' + (this.state.schedule==='prevision'?'active':'')}
                          onClick={this.handleChange.bind(this, 'prevision')} >预展日程</span>
                </div>
                <div className="card-container" style={{padding: '15px 15px 0'}}>
                    {this.state.AuctionList.map((card, i)=><ImgCard {...card}/>)}
                </div>
            </div>
        )
    }
}

class ImgCard extends Component{
    render(){
        return (
            <div className="card">
                <a href={"/auction_list.html?no=" + this.props.NO}>
                    <div className="card-img" style={{backgroundImage: `url(${imageHost + this.props.APPImgUrl})`}} />
                    <div className="card-body">
                        <h3>价格区间</h3>
                        <p className="card-price">
                            <span>{this.props.price}</span>
                            <small>RMB</small>
                        </p>
                        {/*<ul className="card-list">{this.props.card.list.map(info=>(<li key={info}>{info}</li>))}</ul>*/}
                    </div>
                </a>
            </div>
        )
    }
}