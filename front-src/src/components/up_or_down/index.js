import React, {Component} from 'react'
import './style.scss'


export default class UpOrDown extends Component{

    componentWillMount(){
        this.setState({
            value: this.props.value || false
        })
    }

    handleClick(){
        this.setState({
            value: !this.state.value
        }, e=>this.props.onChange(this.state.value))
    }

    render(){
        return (
            <div className="up-or-down__wrap" onClick={this.handleClick.bind(this)}>
                <span className="title">{this.props.title}</span>
                <span className="arrow">{this.state.value?'升':'降'}</span>
            </div>
        )
    }
}