import React,{Component} from 'react'

export default class Header extends Component{

    state = {
        menuOn: false
    }

    toggleMenu(){
        if(!this.state.menuOn){
            document.body.style.paddingTop = window.getComputedStyle(this.refs.searchContainer).height
        } else {
            document.body.style.paddingTop = 0
        }
        this.setState({
            menuOn: !this.state.menuOn
        })
    }

    onPlain(){
        if(this.state.menuOn){
            this.toggleMenu()
        }
    }

    style = {
        wrap: {
            display: 'flex',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '25px 15px 5px'
        },
        logo: {
            width: '40%'
        },
        icon: {
            width: 20,
            marginLeft: 20
        },
        ruler: {
            height: 3,
            width: '100%',
            display: 'block'
        },
        bcg: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 998,
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
    }

    handleSearch(){
        setTimeout(this.props.onSearchClick, 100)
    }

    render(){
        return(
            <div onClick={this.onPlain.bind(this)} ref="searchContainer" style={this.state.menuOn?this.style.bcg:null} >
                <div style={this.style.wrap}>
                    <img style={this.style.logo} src={require('../../assets/images/logo_text2.jpg')} alt=""/>
                    <span>
                        <a onClick={this.handleSearch.bind(this)}>
                            <img style={this.style.icon} src={require('../../assets/images/auction/home_ic_search@2x.png')} alt=""/>
                        </a>
                        <a><img style={this.style.icon}
                                onClick={this.toggleMenu.bind(this)}
                                src={require('../../assets/images/auction/home_ic_more@2x.png')} alt=""/></a>
                        {this.state.menuOn?this.props.menu:null}
                    </span>
                </div>
                <img style={this.style.ruler} src={require('../../assets/images/bg_rule.png')} alt=""/>
            </div>
        )
    }
}
