import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Menus from '../../../components/menus/index'
import ListController from './lists'
import Footer from '../../../components/footer/index'
import InfoBoard from "../../../components/auction/info/index";
import Adv from '../../../components/auction/list_adv'
import { getAuctionListSeatNo } from '../../../helper/http/auction'
import { getParameterByName } from '../../../helper/query_string'

require('./style.scss')


class Main extends Component{
    state = {
        imgList: [],
        workList: [],
        workClassInfo: []
    }
    componentDidMount(){
        const no = getParameterByName('no')
        if(!no){
            alert('没有参数的非法请求！')
            return
        }
        let params = {
            auctionno: no,
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
            }
        })
    }

    classno = getParameterByName('classno') || 1

    render(){
        return (
            <div>
                <div>
                    <Menus no={this.classno} onChange={item=>window.location.href='/auction_schedule.html?classno='+item.no}/>
                    {this.state.imgList.length
                        ? <Adv list={this.state.imgList}/>
                        : null
                    }
                    {this.state.workClassInfo.length
                        ? <InfoBoard info={this.state.workClassInfo[0]}/>
                        :null
                    }
                </div>
                <ListController list={this.state.workList}/>
            </div>
        )
    }
}

const Root = ()=>{

    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
