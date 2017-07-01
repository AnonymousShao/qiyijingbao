import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../../components/carousel'
import Header from '../../components/header'
import Menus from '../../components/menus'
import ListController from './lists'
import Footer from '../../components/footer'
import InfoBoard from "../../components/auction/info/index";
import { getAuctionListSeatNo } from '../../helper/http/auction'
import { getParameterByName } from '../../helper/query_string'
import { imageHost } from '../../helper/config'

require('./style.scss')

class Adv extends Component{

    settings = {
        dots: true,
        dotsClass: 'dots',
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    render(){
        return (
            <div>
                <Carousel settings={this.settings}>
                    {this.props.list.map(image=>(
                        <div className="carousel-container"
                             style={{backgroundImage: `url(${imageHost + image.ImgUrl})`}} />
                    ))}
                </Carousel>
            </div>
        )
    }
}

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
                data = data.res_body
                this.setState({
                    imgList: data.AuctionWorkImg,
                    workList: data.AuctionWorkList,
                    workClassInfo: data.AuctionInfo
                })
            }
        })
    }

    render(){
        return (
            <div>
                <div>
                    <Menus/>
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
