import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import Exhibition from "../detail/exhibition";

import './style.scss'

class Main extends Component{
    
    render(){
        return (
            <div>
                <Exhibition list={[]} />
                <div className="board-container mb10">
                    <h1 className="global-title">雁荡意境</h1>
                    <p className="global-text">刘可明（b.1968）</p>
                    <p className="global-info">60*46cm 约122平尺</p>
                    <p className="global-info">设色纸本  立轴  2006年作</p>
                    <p className="global-text main-color">估价：￥30，000-50，000</p>
                </div>

                <div className="board-container">
                    <p className="global-text">质地：设色纸本</p>
                    <p className="global-text">款识：望秋云，神飞扬</p>
                    <p className="global-text">铃印：汤哲明</p>
                    <p className="global-text">规格：61x40 cm</p>
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
