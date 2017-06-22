import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Head from '../../components/search_head'
import { getAuction, getArtists } from '../../helper/http'
import Carousel from '../../components/Carousel'
import config  from '../../helper/config'
const imgHost = config.imageHost
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
        autoplaySpeed: 5000,
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
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        lazyLoad: true
    }

    render(){
        return (
            <Carousel className="card" settings={this.settings} style={{marginBottom: '0.5rem'}}>
                {this.state.workClass.map(klass =>(klass.artists.length!==0?<div>
                    <p className="title-wrap"><strong className="title">{klass.name}艺术家</strong></p>
                    {klass.artists.length>4?(
                        <ArtistSet artistList={klass.artists} />
                    ):(<div className="artist-container">{klass.artists.map(artist=>(
                        <Artist artist={artist}/>
                    ))}</div>)}
                </div>:null))}
            </Carousel>
        )
    }
}

const Artist = (props) => {
    const artist = props.artist
    return (
        <div className="artist">
            <img className="artist-header" src={ imgHost + artist.HeadImgUrl }/>
            <h3 className="artist-name">{artist.Name}</h3>
            <p className="artist-code">{artist.ArtistCode}</p>
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
            autoplaySpeed: 1500,
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
            <div className="card">
                <p className="title-wrap"><strong className="title">拍品类别</strong></p>
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
        }, {
            name: '浏览资讯',
        }, {
            name: '看看展览',
        }, {
            name: '逛逛商城',
        }, {
            name: '联系客服',
        },
    ]

    render(){
        return(
            <ul className="menu__container">
                {this.menus.map(menu=>(
                    <li>{menu.name}</li>
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
