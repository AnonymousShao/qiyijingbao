import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Input extends Component{

    componentWillMount(){
        this.state = {
            type: this.props.type,
            randomImage: Math.random()
        }
    }

    randomImage(){
        this.setState({
            randomImage: Math.random()
        })
    }

    showPwd(){
        this.setState({
            type: this.state.type==='text'?'password': 'text'
        })
    }

    sendCode(){

    }

    handleChange(event){
        this.props.onChange(event.target.value)
    }

    render(){
        return (
            <div className="cp_input-wrap">
                <span className="cp_input-hd">11</span>
                <div className="cp_input-input">
                    <input type={this.state.type} placeholder={this.props.placeholder||''} onChange={this.handleChange.bind(this)} />
                </div>
                {this.props.actionType==='code'?(
                    <span className="cp_input-code">
                        <img src={"/users?rdm="+this.state.randomImage} onClick={this.randomImage.bind(this)}/>
                    </span>
                ):null}
                {this.props.type==='password'?(
                    <span className="cp_input-ft" onTouchEnd={this.showPwd.bind(this)}>{
                        this.state.type==='password'?'s':'h'
                    }</span>
                ):null}
                {this.props.actionType==='phone'?(
                    <span className="cp_input-phone" onTouchEnd={this.props.onAction}>
                        发送至手机
                    </span>
                ):null}
            </div>
        )
    }
}

export class CodeInput extends Input{
    constructor(props){
        super(props)
    }

}