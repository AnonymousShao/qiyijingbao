import React, {Component} from 'react'
import classnames from 'classnames'
import { toThousands } from '../../helper/query_string'
import './select.scss'

class Box extends Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(){
        this.props.onChange(this.props.value)
    }

    render(){
        const isSelect = classnames('iconfont', 'box-icon', {
            'icon-danxuankuangxuanzhong': this.props.selected,
            'icon-danxuankuangweixuan': !this.props.selected,
        })
        return (<div onClick={this.handleChange} className="box-item__container">
            <i className={isSelect} />
            <div className="box-content">
                <small>RMB &nbsp;</small>
                <span>{toThousands(this.props.value)}</span>
            </div>
        </div>)
    }
}

export default class Boxes extends Component{

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        value: 100
    }

    handleChange(value){
        this.setState({
            value
        })
    }

    render(){
        return (
            <div>
                <div className="boxes-container" style={{color: '#e2943b'}}>
                    {[100, 500, 1000].map(amount=>{
                        return <Box value={amount}
                                    onChange={this.handleChange}
                                    selected={amount===this.state.value}/>
                    })}
                </div>
                <div className="boxes-container" style={{color: '#f05e1c'}}>
                    {[5000, 10000, 30000].map(amount=>{
                        return <Box value={amount}
                                    onChange={this.handleChange}
                                    selected={amount===this.state.value}/>
                    })}
                </div>
                <div style={{marginLeft: 10}}>
                    <Box value={50000}
                         onChange={this.handleChange}
                         selected={50000===this.state.value}/>
                    <span />
                </div>
            </div>
        )
    }
}