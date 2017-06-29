import React,{Component} from 'react'
import './style.scss'

export default class Footer extends Component{

    componentWillMount(){
        this.state = {
            active: 'auction'
        }
    }

    data = [{
        srcOn: require('../../assets/images/footer/tab_bid_pre@2x.png'),
        srcOff: require('../../assets/images/footer/tab_bid@2x.png'),
        name: '竞拍',
        url: '/auction.html',
        key: 'auction'
    }, {
        srcOn: require('../../assets/images/footer/tab_neg_pre@2x.png'),
        srcOff: require('../../assets/images/footer/tab_neg@2x.png'),
        name: '议价',
        url: '',
        key: 'bargain'
    }, {
        srcOn: require('../../assets/images/footer/tab_rule_pre@2x.png'),
        srcOff: require('../../assets/images/footer/tab_rule@2x.png'),
        name: '规则',
        url: '',
        key: 'rule'
    }, {
        srcOn: require('../../assets/images/footer/tab_find_pre@2x.png'),
        srcOff: require('../../assets/images/footer/tab_find@2x.png'),
        name: '发现',
        url: '',
        key: 'find'
    }, {
        srcOn: require('../../assets/images/footer/tab_personal_pre@2x.png'),
        srcOff: require('../../assets/images/footer/tab_personal@2x.png'),
        name: '我的',
        url: '',
        key: 'user'
    }]

    render(){
        return (
            <footer className="footer-container">
                {this.data.map(icon=>(
                    <Icon info={icon} activeKey={this.state.active} />
                ))}
            </footer>
        )
    }
}

class Icon extends Component{
    render(){
        return (
            <div className="footer-item">
                <a href={this.props.info.url}>
                    <img src={this.props.info.key===this.props.activeKey
                        ?this.props.info.srcOn
                        :this.props.info.srcOff} alt=""/>
                    <p className="footer-name">{this.props.info.name}</p>
                </a>
            </div>
        )
    }
}