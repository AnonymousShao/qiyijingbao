import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Head from '../../../components/search_head'
import { getHomeAdv } from '../../../helper/http/bargain'
import Carousel from '../../../components/carousel'
import { imageHost as imgHost } from '../../../helper/config'
import Search from '../../../components/search'
import Footer from '../../../components/footer'
import { Button, ButtonArea } from '../../../components/button'
require('./style.scss')

class Main extends Component{

    constructor(props){
        super(props)
        this.state = {
            slideImgSet: []
        }
        getHomeAdv().then(data=>{
            if(data){
                this.setState({slideImgSet: data.HomeAdv})
            }
        })
    }

    settings = {
        dots: true,
        dotsClass: 'dots',
        autoplay: true,
        infinite: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    handleClick(){

    }

    render(){
        return (
            <div>
                <Carousel settings={this.settings}>
                    {this.state.slideImgSet.map(auction=>(
                        <div className='carousel-container' style={{backgroundImage: `url(${imgHost + auction.ImgAddr})`}} />
                    ))}
                </Carousel>

                <div className="board-container pt20 mb10">
                    <Category />
                </div>

                <div className="board-container mb10">
                    <ButtonArea direction="horizontal">
                        <Button size="small" type='primary'
                                onClick={this.handleClick.bind(this, 'notice')}>看看规则</Button>
                        <Button size="small" type='default'
                                onClick={this.handleClick.bind(this, 'news')}>兜兜作品</Button>
                        <Button size="small" type='default'
                                onClick={e=>window.location.href='/bargain_entrust.html'}>我要委托</Button>
                    </ButtonArea>
                </div>

                <div style={{backgroundColor: 'white'}}>
                    <p className="center-title__wrap" style={{padding: '5px 0 10px'}}>
                        <strong className="center-title">议价指南</strong>
                    </p>

                    <div className="img-bg-container" style={{paddingTop: '40%',
                        backgroundImage: `url(${require('../../../assets/images/bargain/bg_bar.png')})`}}>
                        <div className="content auction-intro" style={{paddingRight: '20%'}}>
                            <h2 className="title">导购/资讯/知识</h2>
                            <p>协商价格简称议价，是指买卖双方通过协商确定的一个双方均愿接受的价格，彼此统一的价格是双方在会计计算。</p>
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}

class ImageLink extends Component{


    render(){
        return (
            <div className="img">
                <a href={"/bargain_list.html?type=" + this.props.type}>
                    <img src={this.props.src} alt=""/>
                </a>
            </div>
        )
    }
}

class Category extends Component{

    render(){
        return (
            <div>
                <div className="category" style={{paddingBottom: 20}}>
                    <ImageLink type="1" src={require('../../../assets/images/bargain/ic_CN painting.png')} alt=""/>
                    <ImageLink type="2" src={require('../../../assets/images/bargain/ic_sculpture.png')} alt=""/>
                    <ImageLink type="3" src={require('../../../assets/images/bargain/ic_porcelain.png')} alt=""/>
                    <ImageLink type="4" src={require('../../../assets/images/bargain/ic_jewelry.png')} alt=""/>
                </div>
                <div className="category">
                    <ImageLink type="5" src={require('../../../assets/images/bargain/ic_bowlder.png')} alt=""/>
                    <ImageLink type="6" src={require('../../../assets/images/bargain/ic_tec.png')} alt=""/>
                    <ImageLink type="7" src={require('../../../assets/images/bargain/ic_fur.png')} alt=""/>
                    <ImageLink type="8" src={require('../../../assets/images/bargain/ic_bl.png')} alt=""/>
                </div>
            </div>
        )
    }
}


class MenuDown extends Component{


    menus = [
        {
            name: '出价参考',
            url: '/auction_bid.html'
        }, {
            name: '浏览资讯',
            url: ''
        }, {
            name: '看看展览',
            url: ''
        }, {
            name: '逛逛商城',
            url: ''
        }, {
            name: '联系客服',
            url: ''
        },
    ]

    render(){
        return(
            <ul className="menu__container">
                {this.menus.map(menu=>(
                    <li><a href={menu.url}>{menu.name}</a></li>
                ))}
            </ul>
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
                <Head onSearchClick={e=>this.setState({showSearch: true})} menu={<MenuDown/>} />
                {this.state.showSearch?<Search hideSearch={e=>this.setState({showSearch: false})}/>:null}
            </div>)
    }
}

const Root = () => (
    <div>
        <Header/>
        <Main />
        <Footer active="bargain"/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
