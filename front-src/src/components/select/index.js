import React, {Component} from 'react'
import './style.scss'
import '../up_or_down/style.scss'

export default class SelectBoarder extends Component{

    componentWillMount(){

    }

    handleClick(){
        this.props.onChange(!this.props.value)
    }

    render(){
        return (
            <div className="up-or-down__wrap" onClick={this.handleClick.bind(this)}>
                <span className="title">{this.props.value.name}</span>
                <span className="arrow">
                    <img style={{height: 12}} src={require('../../assets/images/auction/ic_triangle_nor.png')} alt=""/>
                </span>
                <select className="transparent-select" onChange={this.props.onChange}>
                    {this.props.list.map(li=> <option value={li.value.toString()} key={li.value}>{li.name}</option>)}
                </select>
            </div>
        )
    }
}