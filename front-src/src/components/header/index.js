import React, {Component} from 'react'
import './style.scss'

export default class Header extends Component{

    render(){
        return (
            <div>
                <img className="logo" src={require('../../assets/images/logo_text2.jpg')} alt=""/>
                <img className="logo-underline" src={require('../../assets/images/bg_rule.png')} alt=""/>
            </div>
        )
    }
}