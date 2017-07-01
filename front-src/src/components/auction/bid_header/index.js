import React, {Component} from 'react'
import './style.scss'
import MenuDown from "../../menu_down/index";
import {getWorkClass} from '../../../helper/http'

export default class BidHeader extends Component{

    constructor(props){
        super(props)
        this.toggleShow = this.toggleShow.bind(this)
    }

    state = {
        position: {},
        className: '中国书画',
        menuDisplay: false
    }

    componentDidMount(){
        this.setState({
            position: {
                top: this.refs.btn.offsetTop + this.refs.btn.offsetHeight,
                right: document.body.clientWidth - this.refs.btn.offsetLeft - 0.5 * this.refs.btn.offsetWidth - 18
            }
        })
        this.handleChange(this.menuList[0])
    }

    toggleShow(){
        this.setState({
            menuDisplay: !this.state.menuDisplay
        })
    }

    menuList = [
        {name: '中国书画', no: 1},
        {name: '西画雕塑', no: 2},
        {name: '瓷画陶器', no: 3},
        {name: '珠宝翡翠', no: 4},
        {name: '玉石文玩', no: 5},
        {name: '工艺杂项', no: 6},
        {name: '古典家具', no: 7},
        {name: '佛教珍藏', no: 8}
    ]

    handleChange(item){
        this.props.onChangeClass(item)
        this.setState({className: item.name})
    }

    render(){
        return(
            <div className="header-wrap">
                <div className="header-head">
                    <img className="logo" src={require('../../../assets/images/auction/logo_bid.jpg')} alt=""/>
                    <div className="fr">
                        <span>{this.state.className}</span>
                        <span className="main-color" ref="btn" onClick={this.toggleShow}>[切换]</span>
                        <MenuDown background={true}
                                  show={this.state.menuDisplay}
                                  toggleShow={this.toggleShow}
                                  position={this.state.position}
                                  list={this.menuList}
                                  onChange={this.handleChange.bind(this)}
                        />
                    </div>
                </div>
                <img className="logo-underline" src={require('../../../assets/images/bg_rule.png')} alt=""/>
            </div>
        )
    }
}
