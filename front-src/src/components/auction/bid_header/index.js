import React, {Component} from 'react'
import './style.scss'

export default class BidHeader extends Component{

    render(){
        return(
            <div className="header-wrap">
                <div className="header-head">
                    <img className="logo" src={require('../../../assets/images/auction/logo_bid.jpg')} alt=""/>
                    <div className="fr">
                        <span>中国书画</span>
                        <span className="main-color">[切换]</span>
                    </div>
                </div>
                <img className="logo-underline" src={require('../../../assets/images/bg_rule.png')} alt=""/>
            </div>
        )
    }
}