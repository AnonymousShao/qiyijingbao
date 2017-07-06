import React, {Component} from 'react'
import {imageHost} from '../../../helper/config'
import { getScheduleList } from '../../../helper/http/auction'
import { getParameterByName } from '../../../helper/query_string'


const priceLevels = {
    0: '0 - 1,000',
    1: '1,000 - 5,000',
    2: '5,000 - 10,000',
    3: '10,000 - 50,000',
    4: '50,000 - 500,000',
    5: '> 500,000',
}

export default class Schedule extends Component{

    state = {
        schedule: 'inAuction',
        AuctionList: [],
        AuctionSchedulerAdv: []
    }

    handleChange(type){
        this.setState({
            schedule: type
        })
    }

    componentDidMount(){}

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
                    {this.props.AuctionSchedulerAdv.map((card, i)=><ImgCard {...card} status={this.state.schedule==='inAuction' ?2:1}/>)}
                </div>
            </div>
        )
    }
}

class ImgCard extends Component{
    render(){
        const list = this.props.list.filter(item=>{return item.AuctionStatus===this.props.status})
        return (
            <div className="card">
                <div className="card-img" style={{backgroundImage: `url(${imageHost + this.props.ImgUrl})`}} />
                <div className="card-body">
                    <h3>价格区间</h3>
                    <p className="card-price">
                        <span>{priceLevels[this.props.PriceLevel]}</span>
                        <small>RMB</small>
                    </p>
                    {list.length
                        ? <ul className="card-list">{list.map(info=>(
                            <li key={info.NO}><a href={'/auction_list.html?no='+info.NO}>{new Date(info.BeginTime).toLocaleTimeString()}</a></li>
                        ))}</ul>
                        : <ul className="card-list"><li>暂无{this.props.status===2?'竞拍':'预展'}中的场次</li></ul>
                    }
                </div>
            </div>
        )
    }
}