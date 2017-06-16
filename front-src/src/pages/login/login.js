import React, {Component} from 'react'
import weui from 'react-weui'
import Input from '../../components/input'
import {Link} from 'react-router-dom'
import setTitle from '../../helper/fix-title'
import validator from 'validator'
import { isValidPassword } from '../../helper/validatorX'
const { Toast, Dialog, Button } = weui

import { login } from '../../helper/http'

const phone = 'PHONE',
    password = 'PASSWORD',
    code = 'CODE'

export default class Register extends Component{

    constructor(props){
        super(props)
    }

    componentWillMount(){
        setTitle('登录')
        this.state = {
            dialogShow: false,
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
        if(!this.state[code]){
            this.setState({[code + 'isError']: true})
            setTimeout(()=>{
                this.setState({[code + 'isError']: false})
            }, 500)
            return
        }
        return true
    }

    dealData(){
        if(this.validator()){
            const data = {
                phone: this.state[phone],
                password: this.state[password],
                imgCode: this.state[code]
            }
            if(!data.phone||!data.password||!data.imgCode){
                return
            }
            login(data).then(data=>{
                debugger
            })
        }
    }

    hideDialog(){
        this.setState({
            dialogShow: false
        })
    }

    dialogButtons = [{
        type: 'default',
        label: '前往绑定',
    }, {
        type: 'disabled',
        label: '忽略',
        onClick: this.hideDialog.bind(this)
    }]

    style = {
        weChat: {
            width: '60%',
            margin: 'auto',
            marginTop: 60,
            textAlign: 'center'
        },
        quickImg: {
            width: '100%'
        },
        weChatImg: {
            marginTop: 20,
            width: 40
        },
    }

    render(){
        return (
            <div>
                <div className="cp_input-form">
                    <Input type="text"
                           isError={this.state[phone+'isError']}
                           actionType="phone"
                           placeholder="请输入您的手机号"
                           onChange={this.handleChange.bind(this, phone)}/>
                    <Input type="password"
                           isError={this.state[password+'isError']}
                           actionType="password"
                           placeholder="密码6-18位大小写英文和数字"
                           onChange={this.handleChange.bind(this, password)}/>
                    <Input type="text"
                           isError={this.state[code+'isError']}
                           actionType="imgCode"
                           placeholder="请输入图形验证码"
                           onChange={this.handleChange.bind(this, code)}/>
                </div>
                <Button className="login-submit" onClick={this.dealData.bind(this)}>登录</Button>
                <div className="ft-action">
                    <Link to="/reset">忘记密码</Link>
                    <Link to="/register">注册账号</Link>
                </div>
                <div style={this.style.weChat}>
                    <img style={this.style.quickImg} src={require('../../assets/images/login_quick.png')}/>
                    <a href={'/wx/wxlogin?sourceurl=' + encodeURIComponent(location.href)}>
                        <img style={this.style.weChatImg} src={require('../../assets/images/wechat.png')} alt=""/>
                    </a>
                </div>
                <Dialog show={this.state.dialogShow} buttons={this.dialogButtons}>绑定微信后，在登录时可使用微信快捷登录是否现在绑定？</Dialog>
            </div>
        )
    }
}