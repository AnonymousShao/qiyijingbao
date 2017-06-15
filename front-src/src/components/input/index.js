import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Input extends Component{

    constructor(props){
        super(props)
        this.images = {
            phone: require('../../assets/images/login_phone.png'),
            code: require('../../assets/images/login_code.png'),
            imgCode: require('../../assets/images/login_image.png'),
            password: require('../../assets/images/login_password.png'),
            passwordOn: require('../../assets/images/login_password_on.png'),
            passwordOff: require('../../assets/images/login_password_off.png')
        }
    }

    componentWillMount(){
        this.state = {
            type: this.props.type,
            image: '',
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
                <span className="cp_input-hd">
                    <img style={{width: 20, paddingTop: 10}} src={this.images[this.props.actionType]} alt=""/>
                </span>
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
                        this.state.type==='password'
                            ?(<img style={{width: 20, paddingTop: 10}} src={this.images.passwordOn} alt=""/>)
                            :(<img style={{width: 20, paddingTop: 10}} src={this.images.passwordOff} alt=""/>)
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