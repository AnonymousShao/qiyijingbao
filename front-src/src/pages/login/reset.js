import React, {Component} from 'react'
import Input from '../../components/input'
import {Link} from 'react-router-dom'
import setTitle from '../../helper/fix-title'
import validator from 'validator'
import {isValidPassword} from '../../helper/validatorX'
import { ButtonClassic } from '../../components/button'
import {sendResetCode, resetPwd} from '../../helper/http'

const phone = 'PHONE',
    password = 'PASSWORD',
    code = 'CODE',
    imgCode = 'IMGCODE'

export default class Register extends Component{

    constructor(props){
        super(props)
    }

    componentWillMount(){
        setTitle('重置密码')
        this.state = {
            [phone]: ''
        }
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
        return sendResetCode(params)
    }

    dealData(){
        if(this.validator()){
            const data = {
                phone: this.state[phone],
                password: this.state[password],
                code: this.state[code],
                imgCode: this.state[imgCode]
            }
            resetPwd(data).then(data=>{
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
                           isError={this.state[imgCode+'isError']}
                           actionType="imgCode"
                           placeholder="请输入图形验证码"
                           onChange={this.handleChange.bind(this, imgCode)}/>
                    <Input type="text"
                           actionType="code"
                           placeholder="请输入验证码"
                           onAction={this.sendCode.bind(this)}
                           isError={this.state[code+'isError']}
                           onChange={this.handleChange.bind(this, code)} />
                </div>
                <ButtonClassic
                    className="login-submit"
                    onClick={this.dealData.bind(this)}>登录</ButtonClassic>
                <div className="ft-action">
                    <Link className="u-line" to="/login">登录</Link>
                    <Link className="u-line" to="/register">注册</Link>
                </div>
            </div>
        )
    }
}