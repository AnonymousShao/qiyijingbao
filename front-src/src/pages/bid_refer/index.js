import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import Graphics from "../auction_detail/graphic";
import { getSimilar } from '../../helper/http'
import { getParameterByName } from '../../helper/query_string'
import {imageHost} from '../../helper/config'
import './style.scss'

class Main extends Component{

    state = {
        artistInfo: {},
        list: [],
        dataSet: {
            labels: [],
            maxPriceList: [],
            minPriceList: [],
            avrPriceList: [],
        }
    }

    componentDidMount(){
        const artistNo = getParameterByName('artistno')
        let params = {
            ref_artistno: artistNo
        }
        getSimilar(params).then(data=>{
            if(data){
                const list = data.ArtistExponent
                if(list.length){
                    const labels= [],
                        maxList = [],
                        minList = [],
                        avrList = [];
                    list.forEach(item=>{
                        labels.push(item.ExponentTime)
                        maxList.push(item.MaxAmount)
                        minList.push(item.MinAmount)
                        avrList.push(item.AvgAmount)
                    })

                    this.setState({
                        dataSet: {
                            labels,
                            maxPriceList: maxList,
                            minPriceList: minList,
                            avrPriceList: avrList
                        },
                        list, artistInfo:list[0]
                    })
                }
            }
        })
    }

    render(){
        return (
            <div>
                <div style={{backgroundColor: 'white', marginBottom: 10}}>
                    <p className="center-title__wrap" style={{padding: '6px 0'}}>
                        <strong className="center-title">价格参考</strong>
                    </p>
                    <div>
                        <img style={{width: '100%'}} src={imageHost + this.state.artistInfo.WorkImgUrl} alt=""/>
                    </div>
                    <div className="">
                        <h3 style={{color: '#222222', fontWeight: 'normal'}}>作者：{this.state.artistInfo.ArtistName} 当代</h3>
                        <h4 style={{color: '#666666', fontSize: '0.9rem'}}>题材：{this.state.artistInfo.WorkClassName}</h4>
                        <p style={{color: '#666666' ,fontSize: '0.9rem'}}>简介：
                            {this.state.artistInfo.ArtistDesc}
                        </p>
                    </div>
                </div>

                <div style={{backgroundColor: 'white'}}>
                    <p className="center-title__wrap" style={{padding: '6px 0'}}>
                        <strong className="center-title">{this.state.artistInfo.ArtistName}作品价格曲线图</strong>
                    </p>
                    <Graphics dataSet={this.state.dataSet} />
                </div>
            </div>
        )
    }
}


const Root = () => {
    return (
        <div>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);

