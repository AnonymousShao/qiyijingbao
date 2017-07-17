import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import { Button, ButtonClassic } from '../../components/button'
import './style.scss'
import Boxes from "./select";

class Main extends Component{

    state = {
        value: 100
    }

    render(){
        return (
            <div>
                <div>
                    <div className="board-container" style={{overflow: 'hidden'}}>
                        <p>请选择 <span className="main-color">金额</span></p>
                        <div className="select-pad">
                            <Boxes
                                value={this.state.value}
                                onChange={v=>this.setState({value: v})}
                            />
                        </div>
                        <p className="tip">您本次选择的金额为{this.state.value}元，缴纳成功后，您可以竞拍。起拍价RMB {this.state.value * 10}以内的低价竞品3件。</p>
                        <a className="fr global-info">查看全部<i className="iconfont icon-youjiantou" style={{fontSize: 'inherit'}} /></a>
                    </div>

                    <div style={{padding: '60px 50px'}}>
                        <ButtonClassic onClick={e=>{window.location.href='/pay.html?amount=' + this.state.value}}>我已阅读保证金协议</ButtonClassic>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}


const Root = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
