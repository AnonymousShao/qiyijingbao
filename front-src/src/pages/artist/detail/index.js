import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.scss'
import Graphics from "../../../components/graphics/index";
import Artists from "../../auction/detail/artists";
import { getArtistDataList } from '../../../helper/http/artist'
import { getParameterByName } from '../../../helper/query_string'


class Main extends Component{

    componentWillMount(){
        const no = getParameterByName('artistno')
        let params = {
            artistno: no
        }
        getArtistDataList(params).then(data=>{
            if(data){
                this.setState({
                    ArtistExponent: data.ArtistExponent
                })
            }
        })
    }

    state = {
        artistNo: getParameterByName('artistno'),
        ArtistExponent: []
    }

    render(){
        return (
            <div>
                <Artists artistNo={this.state.artistNo}/>
                <Graphics ArtistExponent={this.state.ArtistExponent}/>
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
