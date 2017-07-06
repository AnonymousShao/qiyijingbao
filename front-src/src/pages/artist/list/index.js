import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Footer from '../../../components/footer'
import {SearchBar} from '../../../components/button'
import './style.scss'
import { getArtists } from '../../../helper/http'
import {Type3} from "../../../components/Image_text_items/index";
import Carousel from "../../../components/carousel/index";

class Main extends Component{


    state = {
        view: '',
        searchText: '',
        workClass: [
            [

            ], [

            ]
        ],
        artistList: []
    }

    handleChange(text){
        this.setState({
            searchText: text
        })
    }

    componentDidMount(){
        getArtists().then(data=>{
            const forIndex = {},
                workSet = [];
            data.workClass.forEach(klass=>{
                klass.artists = []
                forIndex[klass.description] = {sourceClass: klass}
            })
            data.artistList.forEach(artist=>{
                forIndex[artist.ArtistCode[0]].sourceClass.artists.push(artist)
            })
            this.setState({
                workClass: data.workClass,
                artistList: data.artistList
            })
        })
    }

    data = [
        {
            name: '毛晓沪',
            id: 'GIWKE87',
            desc: '古董投资专业顾问，现任北京华夏物证陶瓷鉴定研究所所长。擅长瓷器鉴定、古的陶瓷...',
            head: require('../../../assets/images/img_source/img_3.png')
        }, {
            name: '毛晓沪',
            id: 'GIWKE87',
            desc: '古董投资专业顾问，现任北京华夏物证陶瓷鉴定研究所所长。擅长瓷器鉴定、古的陶瓷...',
            head: require('../../../assets/images/img_source/img_2.png')
        }, {
            name: '毛晓沪',
            id: 'GIWKE87',
            desc: '古董投资专业顾问，现任北京华夏物证陶瓷鉴定研究所所长。擅长瓷器鉴定、古的陶瓷...',
            head: require('../../../assets/images/img_source/img_4.png')
        },
    ]

    settings = {
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    }

    render(){
        return (
            <div>
                <div>
                    <SearchBar
                        placeholder='请输入艺术品名、类别、艺术家、资讯关键字'
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="title-tab__container">{
                    this.state.artistList.length?
                    <Carousel settings={this.settings}>
                        <div style={{textAlign: 'center'}}>
                            <span className={"title-tab__item " + (this.state.view==='all'?'active':'')}
                                  onClick={e=>this.setState({view: 'all'})}>全部</span>
                        </div>
                        {this.state.workClass.map(klass=>(<div style={{textAlign: 'center'}}>
                                <span className={"title-tab__item " + (this.state.view==='all'?'active':'')}
                                      onClick={e=>this.setState({view: 'all'})}>{klass.name}</span>
                            </div>
                        ))}
                    </Carousel>:null
                }

                    {/*<span className={"title-tab__item " + (this.state.view==='all'?'active':'')}*/}
                          {/*onClick={e=>this.setState({view: 'all'})}>全部</span>*/}
                    {/*<span className={"title-tab__item " + (this.state.view==='gh'?'active':'')}*/}
                          {/*onClick={e=>this.setState({view: 'gh'})}>国画</span>*/}
                    {/*<span className={"title-tab__item " + (this.state.view==='ch'?'active':'')}*/}
                          {/*onClick={e=>this.setState({view: 'ch'})}>瓷画</span>*/}
                    {/*<span className={"title-tab__item " + (this.state.view==='yh'?'active':'')}*/}
                          {/*onClick={e=>this.setState({view: 'yh'})}>油画</span>*/}
                </div>
                <div>
                    <ul>{this.data.map(item=><Type3 {...item}/>)}</ul>
                </div>

            </div>
        )
    }
}

const Root = () => {
    return (
        <div>
            <Main/>
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
