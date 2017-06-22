import React, {Component} from 'react'

export default class Header extends Component{

    style = {
        wrap: {
            display: 'flex',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '25px 15px 10px'
        },
        logo: {
            width: '26%'
        },
        icon: {
            width: 20,
            marginLeft: 20,
            float: 'right'
        },
        ruler: {
            height: 3,
            display: 'block'
        }
    }

    render(){
        return(
            <div>
                <div style={this.style.wrap}>
                    <img style={this.style.logo} src={require('../../assets/images/auction/logo_auction.jpg')} alt=""/>
                    <a onClick={this.props.onSearchClick}>
                        <img style={this.style.icon} src={require('../../assets/images/auction/home_ic_search@2x.png')} alt=""/>
                    </a>
                </div>
                <img style={this.style.ruler} src={require('../../assets/images/bg_rule.png')} alt=""/>
            </div>
        )
    }
}
