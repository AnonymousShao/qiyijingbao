import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import Exhibition from "../detail/exhibition";
import { getWorkInfo } from '../../../helper/http/work'
import { getParameterByName , toThousands } from '../../../helper/query_string'
import './style.scss'

class Main extends Component{

    state = {
        WorkDetail: {},
        info: {},
        imgList: []
    }

    componentDidMount(){
        let params = {
            no: getParameterByName('no')
        }
        getWorkInfo(params).then(data=>{
            if(data){
                this.setState({
                    info: data.WorkDetail[0],
                    imgList: data.WorkImg
                })
            }
        })
    }

    render(){
        return (
            <div>
                <Exhibition list={this.state.imgList} />
                <div className="board-container mb10">
                    <h1 className="global-title">{this.state.info.Title}</h1>
                    <p className="global-text">{this.state.info.ArtistName}（b.{this.state.info.Birthday}）</p>
                    <p className="global-info">{this.state.info.Specifications}</p>
                    <p className="global-info">（空）设色纸本  立轴  {this.state.info.CreationTime}作</p>
                    <p className="global-text main-color">估价：RMB {toThousands(this.state.info.MinEvaluationPrice)} - {toThousands(this.state.info.MaxEvaluationPrice)}</p>
                </div>

                <div className="board-container">
                    <p className="global-text">质地：{this.state.info.Character}</p>
                    <p className="global-text">款识：{this.state.info.Design || '-'}</p>
                    <p className="global-text">铃印：{this.state.info.SealingStyle || '-'}</p>
                    <p className="global-text">规格：{this.state.info.Specifications}</p>
                </div>
            </div>
        )
    }
}


const Root = () => {
    return (
        <div>
            <Header />
            <Main/>
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
