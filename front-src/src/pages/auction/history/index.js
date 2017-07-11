import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import './style.scss'
import UpOrDown from "../../../components/up_or_down/index";
import { getHistoryList } from '../../../helper/http/auction'
import { getParameterByName } from '../../../helper/query_string'
import {imageHost} from '../../../helper/config'

class ImageCard extends Component{

    render(){
        return (
            <li className="image-card">
                <a href={"/auction_history_list.html?workno=" + this.props.NO}>
                    <div className="image-card-head">
                        <img src={imageHost + this.props.APPImgUrl} alt=""/>
                    </div>
                    <div className="image-card-body">
                        <h3 className="title">
                            <span>{this.props.Title}</span>
                            <img src='' alt=""/>
                        </h3>
                        <p className="date">结拍: {new Date(this.props.EndTime).toLocaleDateString()}</p>
                        <p className="price">成交额：<span className="main-color">RMB {this.props.SuccTradeAmt}</span></p>
                        <p className="info">
                            <span>{this.props.WorkCount}件拍品</span>
                            <span>{this.props.BidCount}次出价</span>
                        </p>
                    </div>
                </a>
            </li>
        )
    }
}

class Main extends Component{

    state = {
        AuctionList: []
    }

    componentDidMount(){
        let params = {
            classno: getParameterByName('classno')
        }
        getHistoryList(params).then(data=>{
            this.setState({
                AuctionList: data.AuctionList
            })
        })
    }

    render(){
        return (
            <div>
                <div className="board-container mb10">
                    <span>排序</span>
                    <UpOrDown title="结束时间"/>
                </div>
                <div className="board-container pt15">
                    <ul>
                        {this.state.AuctionList.map(card=><ImageCard {...card} />)}
                    </ul>
                </div>
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
