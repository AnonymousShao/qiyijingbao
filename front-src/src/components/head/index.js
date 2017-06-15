import React,{Component} from 'react'

export default class Head extends Component{

    render(){
        return (
            <header>
                <img className="logo-text" src={require('../../assets/images/logo_text.jpg')} alt="天宝在线"/>
                <img className="banner" src={require('../../assets/images/bg_rule.png')}/>
                <img className="logo" src={require('../../assets/images/logo@2x.jpg')} alt=""/>
            </header>
        )
    }
}

