import React, {Component} from 'react'
import Input from '../../components/input'
import {Link} from 'react-router-dom'
import setTitle from '../../helper/fix-title'
import validator from 'validator'
import {isValidPassword} from '../../helper/validatorX'
import { ButtonClassic} from '../../components/button'
import { register, sendSMS } from '../../helper/http'

const phone = 'PHONE',
    password = 'PASSWORD',
    code = 'CODE',
    imgCode = 'IMGCODE'

class CheckBox extends Component{

    componentWillReceiveProps(nextProps){
        // if(nextProps.checked)
    }

    toggle() {
        this.props.onChange(!this.props.checked)
    }

    render(){
        return (
            <img style={{width: '1.2em', paddingRight: 5}}
                 onClick={this.toggle.bind(this)}
                 src={this.props.checked
                     ?require('../../assets/images/login_choose_sel.png')
                     :require('../../assets/images/login_choose.png')} alt=""/>
        )
    }
}

export default class Register extends Component{

    constructor(props){
        super(props)
        this.state = {
            checked: true,
            [phone]: ''
        }
    }
    componentWillMount(){
        setTitle('注册')
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    validator(){
        if(!validator.isMobilePhone(this.state[phone], 'zh-CN')){
            this.setState({[phone + 'isError']: true})
            setTimeout(()=>{
                this.setState({[phone + 'isError']: false})
            }, 500)
            return
        }
        if(!isValidPassword(this.state[password])){
            this.setState({[password + 'isError']: true})
            setTimeout(()=>{
                this.setState({[password + 'isError']: false})
            }, 500)
            return
        }
        if(!this.state[imgCode]){
            this.setState({[imgCode + 'isError']: true})
            setTimeout(()=>{
                this.setState({[imgCode + 'isError']: false})
            }, 500)
            return
        }
        if(!this.state[code]){
            this.setState({[code + 'isError']: true})
            setTimeout(()=>{
                this.setState({[code + 'isError']: false})
            }, 500)
            return
        }
        return true
    }

    sendCode(){
        if(!validator.isMobilePhone(this.state[phone], 'zh-CN')){
            this.setState({[phone + 'isError']: true})
            setTimeout(()=>{
                this.setState({[phone + 'isError']: false})
            }, 500)
            return Promise.resolve(false)
        }
        const params = {
            phone: this.state[phone]
        }
        return sendSMS(params)  // 交给 倒计时处 处理
    }

    dealData(){
        if(this.validator()){
            const data = {
                phone: this.state[phone],
                password: this.state[password],
                code: this.state[code],
                imgCode: this.state[imgCode]
            }
            register(data).then(data=>{
                if(data){
                    window.location.href = '/auction.html'
                    // alert('注册成功，即将跳转(假装的)！')
                }
            })
        }
    }

    render(){
        return (
            <div>
                <div className="cp_input-form">
                    <Input type="text"
                           actionType="phone"
                           placeholder="请输入您的手机号"
                           isError={this.state[phone+'isError']}
                           onChange={this.handleChange.bind(this, phone)}/>
                    <Input type="password"
                           actionType="password"
                           placeholder="密码6-18位英文和数字"
                           isError={this.state[password+'isError']}
                           onChange={this.handleChange.bind(this, password)}/>
                    <Input type="text"
                           actionType="imgCode"
                           placeholder="请输入图形验证码"
                           isError={this.state[imgCode+'isError']}
                           onChange={this.handleChange.bind(this, imgCode)}/>
                    <Input type="text"
                           actionType="code"
                           placeholder="请输入验证码"
                           onAction={this.sendCode.bind(this)}
                           isError={this.state[code+'isError']}
                           onChange={this.handleChange.bind(this, code)} />
                </div>
                <ButtonClassic
                    className={"login-submit " + (this.state.checked?'':'login-disabled')}
                    onClick={this.dealData.bind(this)}>注册</ButtonClassic>
                <div className="ft-action">
                    <span>
                        <CheckBox checked={this.state.checked} onChange={this.handleChange.bind(this, 'checked')}/>
                        <span style={{verticalAlign: 'text-top'}}>同意《天宝用户注册协议》</span>
                    </span>
                    <Link className="u-line" to="/login">登录</Link>
                </div>
            </div>
        )
    }
}

