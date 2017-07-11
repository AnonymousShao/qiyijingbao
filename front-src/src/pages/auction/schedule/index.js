import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Head from '../../../components/search_head_lite/index'
import Carousel from '../../../components/carousel/index'
import { Button, ButtonArea } from '../../../components/button/index'
import Schedule from './schedule'
import {imageHost} from '../../../helper/config'
import { getScheduleList } from '../../../helper/http/auction'
import { getParameterByName } from '../../../helper/query_string'
import Menus from '../../../components/menus/index'
import Footer from '../../../components/footer/index'
import Search from "../../../components/search/index";
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
                    {this.props.list.map(li=>(
                        <div className="carousel-container"
                             style={{backgroundImage: `url(${imageHost + li.ImgAddr})`}} />
                    ))}
                </Carousel>
            </div>
        )
    }
}

class Adv2 extends Component{
    settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    render(){
        return (
            <Carousel settings={this.settings} style={{marginBottom: 15}}>
                {this.props.list.map(i=>(
                    <div className="carousel-container"
                         style={{height: 70, backgroundImage: `url(${i.ImgAddr})`}} />
                ))}
            </Carousel>
        )
    }
}

class Controller extends Component{

    state = {
        classNo: getParameterByName('classno') || '1',
        active: 'notice',
        AuctionList: [],
        AuctionSchedulerAdv:[],
        adv1: [],
        adv2: [],
    }

    style = {
        container: {
            padding: 15,
            backgroundColor: 'white',
            marginBottom: 15
        }
    }

    componentDidMount(){
        this.getList()
    }

    getList(){
        let params = {
            classno: this.state.classNo
        }
        getScheduleList(params).then(data=>{
            if(data){
                const adv1 = [], adv2 = []
                data.AuctionHeaderAdv.forEach(adv=>{
                    if(adv.IsSecondLevel === 1){
                        adv2.push(adv)
                    }else{
                        adv1.push(adv)
                    }
                })
                const forIndex = {}
                data.AuctionSchedulerAdv.forEach(item=>{
                    forIndex[item.PriceLevel] = item
                    item.list = []
                })
                data.AuctionList.forEach(item=>{
                    forIndex[item.PriceBelong].list.push(item)
                })
                this.setState({
                    adv1, adv2,
                    AuctionList: data.AuctionList,
                    AuctionSchedulerAdv: data.AuctionSchedulerAdv,
                })
            }
        })
    }

    handleClick(type){
        this.setState({
            active: type
        })
    }

    changeClass(target){
        window.history.pushState(null, null, '/auction_schedule.html?classno=' + target.no)
        this.setState({
            classNo: target.no
        }, this.getList)
    }

    render(){
        return (
            <div>
                <Menus no={this.state.classNo} onChange={this.changeClass.bind(this)}/>

                {this.state.adv1.length
                    ?<Adv list={this.state.adv1}/>
                    :null}

                <div style={this.style.container}>
                    {this.state.adv2.length
                        ?<Adv2 list={this.state.adv2}/>
                        :null}
                    <ButtonArea direction="horizontal">
                        <Button size="small" type={this.state.active==='notice'?'primary':'default'}
                                onClick={this.handleClick.bind(this, 'notice')}>竞拍须知</Button>
                        <Button size="small" type={this.state.active==='news'?'primary':'default'}
                                onClick={this.handleClick.bind(this, 'news')}>竞拍资讯</Button>
                        <Button size="small" type={this.state.active==='share'?'primary':'default'}
                                onClick={this.handleClick.bind(this, 'share')}>分享给朋友</Button>
                    </ButtonArea>
                </div>
                <Schedule classNo={this.state.classNo} AuctionSchedulerAdv={this.state.AuctionSchedulerAdv}/>
                <div className="board-container">
                    <a href={"/auction_history.html?classno=" + this.state.classNo}>
                        <Button style={{backgroundSize: 'cover', backgroundImage: `url(${require('../../../assets/images/btn_2.png')})`}}>历史场次回顾</Button>
                    </a>
                </div>
            </div>
        )
    }
}

class Header extends Component{
    state = {
        showSearch: false
    }

    render(){
        return (
            <div>
                <Head onSearchClick={e=>this.setState({showSearch: true})}/>
                {this.state.showSearch?<Search hideSearch={e=>this.setState({showSearch: false})}/>:null}
            </div>)
    }
}

const Root = () => (
    <div>
        <Header />
        <div>
            <Controller />
            <Footer/>
        </div>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
