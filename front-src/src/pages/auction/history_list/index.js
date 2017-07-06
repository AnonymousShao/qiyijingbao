import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import './style.scss'
import UpOrDown from "../../../components/up_or_down/index";


class ImageCard extends Component{

    render(){
        return (
            <li className="image-card">
                <a href="/auction_history_detail.html">
                    <div className="image-card-head">
                        <img src={this.props.image} alt=""/>
                    </div>
                    <div className="image-card-body">
                        <h3 className="title">
                            <span>{this.props.title}</span>
                            <img src='' alt=""/>
                        </h3>
                        <p className="date">结拍: 5.30</p>
                        <p className="price">成交额：<span className="main-color">RMB 1000</span></p>
                        <p className="info">
                            <span>13件拍品</span>
                            <span>899次出价</span>
                        </p>
                    </div>
                </a>
            </li>
        )
    }
}

class Main extends Component{

    render(){
        return (
            <div>
                <div className="board-container mb10">
                    <span>排序</span>
                    <UpOrDown title="结束时间"/>
                </div>
                <div className="board-container pt15">
                    <ul>
                        {[1,2,3,4,5].map(i=><ImageCard image={require('../../../assets/images/img_source/img_13.png')} title="国画专场"/>)}
                    </ul>
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
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
