import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.scss'
import Graphics from "../auction_detail/graphic";
import Artists from "../auction_detail/artists";
import {getArtistDataList} from '../../helper/http/artist'
import { getParameterByName } from '../../helper/query_string'


class Main extends Component{

    componentWillMount(){
        const no = getParameterByName('artistno')
        let params = {
            artistno: no
        }
        getArtistDataList(params).then(data=>{
            if(data){
                const list = data.ArtistExponent,
                    labels = [],
                    maxPriceList = [],
                    minPriceList = [],
                    avrPriceList = [];
                list.forEach(item=>{
                    labels.push(item.ExponentTime)
                    maxPriceList.push(item.MaxAmount)
                    minPriceList.push(item.MinAmount)
                    avrPriceList.push(item.AvgAmount)
                })
                this.setState({
                    dataSet: {
                        labels, maxPriceList, minPriceList, avrPriceList
                    }
                })
            }
        })
    }

    state = {
        artistNo: getParameterByName('artistno'),
        dataSet: {
            labels: [],
            maxPriceList: [],
            minPriceList: [],
            avrPriceList: [],
        }
    }

    render(){
        return (
            <div>
                <Artists artistNo={this.state.artistNo}/>
                {this.state.dataSet.labels.length?<Graphics dataSet={this.state.dataSet}/>:null}
            </div>
        )
    }
}

const Root = () => {
    return (
        <div>
            <Header/>
            <Main/>
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
