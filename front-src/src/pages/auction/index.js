import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Head from '../../components/search_head'
import { getAuction, getArtists } from '../../helper/http'
import Carousel from '../../components/carousel'
import { imageHost as imgHost } from '../../helper/config'
import Search from '../../components/search'
import Footer from '../../components/footer'

require('./style.scss')

let artistLists = []

class Main extends Component{

    constructor(props){
        super(props)
        this.state = {
            slideImgSet: []
        }
        getAuction().then(data=>{
            this.setState({
                slideImgSet: data.AuctionList
            })
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

    render(){
        return (
            <Carousel settings={this.settings}>
                {this.state.slideImgSet.map(auction=>(
                    <div className='carousel-container' style={{backgroundImage: `url(${imgHost + auction.APPImgUrl})`}} />
                ))}
            </Carousel>
        )
    }
}

class Artists extends Component{
    constructor(props){
        super(props)
        this.state = {
            workClass: [],
        }
        getArtists().then(data=>{
            const forIndex = {}
            artistLists = data.artistList
            data.workClass.forEach(klass=>{
                klass.artists = []
                forIndex[klass.description] = {sourceClass: klass}
            })
            data.artistList.forEach(artist=>{
                forIndex[artist.ArtistCode[0]].sourceClass.artists.push(artist)
            })
            this.setState({
                workClass: data.workClass,
            })
        })
    }

    settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        lazyLoad: true
    }

    render(){
        return (
            <Carousel className="board-container" settings={this.settings} style={{marginBottom: '0.5rem'}}>
                {this.state.workClass.map(klass =>(klass.artists.length!==0?<div>
                    <a style={{color: '#222'}} href="/artist_list.html">
                        <p className="center-title__wrap" style={{padding: '5px 0 10px'}}>
                            <a href="/artist_list.html"><strong className="center-title">{klass.name}艺术家</strong></a>
                        </p>
                        {klass.artists.length>4?(
                            <ArtistSet artistList={klass.artists} />
                        ):(<div className="artist-container">{klass.artists.map(artist=>(
                            <Artist artist={artist}/>
                        ))}</div>)}
                    </a>
                </div>:null))}
            </Carousel>
        )
    }
}

const Artist = (props) => {
    const artist = props.artist
    return (
        <div className="artist">
            <a href={"/artist_detail.html?artistno=" + artist.NO}>
                <img className="artist-header" src={ imgHost + artist.HeadImgUrl }/>
                <h3 className="artist-name">{artist.Name}</h3>
                <p className="artist-code">{artist.ArtistCode}</p>
            </a>
        </div>
    )
}


class ArtistSet extends Component{

    constructor(props){
        super(props)

        let groupCount = Math.floor(props.artistList.length / 4),
            groups = new Array(groupCount)

        this.state = {
            groups,
            groupCount,
            current: 0
        }

        this.props.artistList.forEach((artist, index)=>{
            const groupNo = Math.floor(index / 4)
            if(!groups[groupNo]) groups[groupNo] = []
            groups[groupNo].push(artist)
        })
    }

    render(){
        const settings = {
            infinite: false,
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            lazyLoad: true
        }

        return (
            <Carousel settings={settings}>
                {this.state.groups.map(group=>(
                    <div>
                        <div style={{width: document.body.clientWidth - 20}}>{group.map(artist=>(
                            <Artist artist={artist} />
                        ))}</div>
                    </div>
                ))}
            </Carousel>
        )
    }
}


class Category extends Component{

    render(){
        return (
            <div className="board-container">
                <p className="center-title__wrap" style={{padding: '5px 0 10px'}}>
                    <strong className="center-title">拍品类别</strong>
                </p>
                <div className="category">
                    <a href="/auction_schedule.html" className="category-item">
                        <img src={require('../../assets/images/auction/img_CN painting.png')} alt=""/>
                    </a>
                    <a href="/auction_schedule.html" className="category-item">
                        <img src={require('../../assets/images/auction/img_sculpture.png')} alt=""/>
                    </a>
                </div>
                <div className="category">
                    <a href="/auction_schedule.html" className="category-item">
                        <img src={require('../../assets/images/auction/img_porcelain.png')} alt=""/>
                    </a>
                    <a href="/auction_schedule.html" className="category-item">
                        <img src={require('../../assets/images/auction/img_jewelry.png')} alt=""/>
                    </a>
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
        <Artists />
        <Category />
        <Footer/>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
