import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Footer from '../../../components/footer'
import {SearchBar} from '../../../components/button'
import './style.scss'
import { getArtists } from '../../../helper/http'
import {Type3} from "../../../components/Image_text_items/index";
import { MenuList } from '../../../components/menus'

function fourlize(arr) {
    const mainArr = []
    let currentArr;
    for(let i=0;i<arr.length;i++){
        if(i % 4===0){
            currentArr = []
            mainArr.push(currentArr)
        }
        currentArr.push({
            name: arr[i].name,
            no: arr[i].description
        })
    }
    return mainArr
}

class Main extends Component{

    constructor(props){
        super(props)
        this.handleChangeNo = this.handleChangeNo.bind(this)
    }

    state = {
        no: 0,
        view: '',
        workClass: [],
        searchText: '',
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
                workSet = [],
                menuList = fourlize(data.workClass)

            data.workClass.forEach(klass=>{
                klass.artists = []
                forIndex[klass.description] = {sourceClass: klass}
            })

            data.artistList.forEach(artist=>{
                forIndex[artist.ArtistCode[0]].sourceClass.artists.push(artist)
            })


            this.setState({
                menuList,
                workClass: data.workClass,
                artistList: data.artistList
            })
        })
    }

    settings = {
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    }

    handleChangeNo(klass){
        for(let i=0;i<this.state.workClass.length;i++){
            if(this.state.workClass[i].description === klass.no){
                this.setState({no: i})
                return
            }
        }
    }

    render(){
        return (
            <div>
                <div>
                    <SearchBar
                        placeholder='请输入艺术品名、类别、艺术家、资讯关键字'
                        onChange={this.handleChange.bind(this)}/>
                </div>
                {this.state.artistList.length
                    ? <MenuList no={this.state.no} onChange={this.handleChangeNo} list={this.state.menuList}/>
                    : null}
                <div>
                    {this.state.workClass[this.state.no]
                        ?<ul>{this.state.workClass[this.state.no].artists.map(item=><Type3 {...item}/>)}</ul>
                        :null}
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
