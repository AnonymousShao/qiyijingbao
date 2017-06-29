import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Footer from '../../components/footer'
import './style.scss'
import Arts from "./arts";
import News from "./news";
import Artists from "./artists";
import {SearchBar} from "../../components/button";
import { searchAuction, getArtists } from '../../helper/http'
import { getParameterByName } from '../../helper/query_string'
const q = getParameterByName('q')

class Main extends Component{

    componentDidMount(){
        searchAuction().then(data=>{
            const list = data.AuctionList
            let result = list.filter(i=>{
                return i.Title.indexOf(q)>-1
            })
            this.setState({
                auctionInfo: result
            })
        })
        getArtists().then(data=>{
            const forIndex = {};
            data.workClass.forEach(klass=>{
                klass.artists = []
                forIndex[klass.description] = {sourceClass: klass}
            })
            data.artistList.forEach(artist=>{
                if(artist.Name.indexOf(q)>-1){
                    forIndex[artist.ArtistCode[0]].sourceClass.artists.push(artist)
                }
            })
            this.setState({
                workClass: data.workClass,
            })
        })
    }

    state = {
        auctionInfo: [],
        workClass: [],
        view: 'arts',
        searchText: ''
    }

    handleChange(text){
        this.setState({
            searchText: text
        })
    }

    render(){
        return (
            <div>
                <div>
                    <SearchBar
                        placeholder='请输入艺术品名、类别、艺术家、资讯关键字'
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="title-tab__container">
                    <span className={"title-tab__item " + (this.state.view==='arts'?'active':'')}
                          onClick={e=>this.setState({view: 'arts'})}>艺术品</span>
                    <span className={"title-tab__item " + (this.state.view==='artists'?'active':'')}
                          onClick={e=>this.setState({view: 'artists'})}>艺术家</span>
                    <span className={"title-tab__item " + (this.state.view==='news'?'active':'')}
                          onClick={e=>this.setState({view: 'news'})}>资讯</span>
                </div>
                <div>
                    {this.state.view==='arts'? <Arts auctionList={this.state.auctionInfo}/>:null}
                    {this.state.view==='artists'?<Artists workClass={this.state.workClass} />:null}
                    {this.state.view==='news'?<News/>:null}
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
