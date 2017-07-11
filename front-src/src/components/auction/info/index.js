import React, {Component} from 'react'
import OverflowDrop from "../../overflow_drop/index";
import {Dialog} from '../../button'
import Actions from "../actions/index";
import { toThousands } from '../../../helper/query_string'
import './style.scss'

export default class InfoBoard extends Component{

    state = {
        showRemainder: false,
        buttons: [{
            type: 'default',
            label: '确定',
            onClick: e=>this.setState({showRemainder: false})
        }, {
            type: 'default',
            label: '关闭',
            onClick: e=>this.setState({showRemainder: false})
        }
        ]
    }

    remainder(){

    }

    render(){
        return (
            <div className="auction-info__wrap">

                <Dialog
                    show={this.state.showRemainder}
                    buttons={this.state.buttons}
                >
                    <div>
                        我们将根据您的选择为您发送短信通知以及站内消息。请选择您所需的提醒:
                    </div>
                    <div style={{margin: 'auto', width: 150, padding: 15}}>
                        <p><input type="checkbox"/><span>开拍前24小时</span></p>
                        <p><input type="checkbox"/><span>我的出价被超越</span></p>
                        <p><input type="checkbox"/><span>竞拍介绍前30分钟</span></p>
                    </div>
                </Dialog>

                <p>
                    <span className="auction-info__info">竞拍场次：{this.props.info.AuctionNO}</span>
                    {this.props.history
                        ?<span className="fr">
                            <img style={{height: 20, paddingTop: 5}} src={require('../../../assets/images/auction/ic_auction ends.png')} alt=""/>
                        </span>
                        :null}
                </p>
                <h2>
                    <span className="auction-info__title">{this.props.info.Title}</span>
                    {!this.props.history
                        ?<span onClick={e=>this.setState({showRemainder: true})} className="fr auction-info__remainder">提醒</span>
                        :null}
                </h2>
                <p className="auction-info__info">竞拍地点：网络竞拍</p>
                <p className="auction-info__info">竞拍时间：{new Date(this.props.info.BeginTime).toLocaleDateString()} - {new Date(this.props.info.EndTime).toLocaleDateString()}</p>
                {this.props.history
                    ?null
                    :<p className="auction-info__info">倒数: <span className="main-color">
                    {Math.ceil((new Date(this.props.info.EndTime) - new Date())/(84000 * 1000))}天</span></p>}


                <OverflowDrop
                    className="max-height2 auction-info__content"
                    content={this.props.info.SubTile}
                />
                {this.props.history?null:<Actions/>}
            </div>
        )
    }
}
