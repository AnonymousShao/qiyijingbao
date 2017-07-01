import React, {Component} from 'react'
import './style.scss'


export default class UpOrDown extends Component{

    componentWillMount(){

    }

    handleClick(){
        this.props.onChange(!this.props.value)
    }

    render(){
        return (
            <div className="up-or-down__wrap" onClick={this.handleClick.bind(this)}>
                <span className="title">{this.props.title}</span>
                <span className="arrow">{this.props.value
                    ? <img style={{height: 12}} src={require('../../assets/images/auction/ic_triangle_up.png')} alt=""/>
                    : <img style={{height: 12}} src={require('../../assets/images/auction/ic_triangle_down.png')} alt=""/>
                }</span>
            </div>
        )
    }
}