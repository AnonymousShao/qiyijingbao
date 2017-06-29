import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.scss'
import Graphics from "../auction_detail/graphic";
import Artists from "../auction_detail/artists";
import { getParameterByName } from '../../helper/query_string'


class Main extends Component{

    componentWillMount(){
        let artistNo = getParameterByName('artistno')
        this.state = {
            artistNo
        }
    }

    state = {}

    render(){
        return (
            <div>
                <Artists artistNo={this.state.artistNo}/>
                <Graphics/>
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
