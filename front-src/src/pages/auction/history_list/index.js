import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import Menus from "../../../components/menus/index"
import InfoBoard from "../../../components/auction/info/index"
import Adv from '../../../components/auction/list_adv'
import ListController from "./list"
import './style.scss'

import { getParameterByName } from '../../../helper/query_string'
import { getAuctionDetail, getAuctionListSeatNo, getSucRecord } from '../../../helper/http/auction'


class Main extends Component{

    constructor(props){
        super(props)
        this.handleChangeMenu = this.handleChangeMenu.bind(this)
    }

    state = {
        workNo: getParameterByName('workno'),
        imgList: [],
        workList: [],
        workClassInfo: [],
        sucRecordList: []
    }

    componentDidMount(){
        let params = {
            auctionno: this.state.workNo,
            rows: 1000,//每页数量暂不分页
            page: 1,
            workclassno: 0
        }
        getAuctionListSeatNo(params).then(data=>{
            if(data){
                this.setState({
                    imgList: data.AuctionWorkImg,
                    workList: data.AuctionWorkList,
                    workClassInfo: data.AuctionInfo
                })
                let recordParams = {
                    auctionNo: data.AuctionInfo[0].AuctionNO
                }
                getSucRecord(recordParams).then(data=>{
                    if(data){
                        this.setState({
                            sucRecordList: data.AuctionWorkSuccTradeList
                        })
                    }
                })
            }
        })
    }

    handleChangeMenu(){

    }

    render(){
        console.log(this.state.workClassInfo)
        return (
            <div>
                <Menus onChange={this.handleChangeMenu}/>

                {this.state.imgList.length
                    ? <Adv list={this.state.imgList}/>
                    : null
                }

                {this.state.workClassInfo.length
                    ? <InfoBoard
                        info={this.state.workClassInfo[0]}
                        history="true"/>
                    :null
                }
                <ListController
                    historyList={this.state.sucRecordList}
                    list={this.state.workList}/>
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
