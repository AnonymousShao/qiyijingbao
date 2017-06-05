import React, {Component} from 'react'
import weui from 'react-weui'
import Input from '../../components/input'
import {Link} from 'react-router-dom'
import setTitle from '../../helper/fix-title'
const { Toast, Dialog, Button } = weui

const phone = 'PHONE',
    password = 'PASSWORD',
    code = 'CODE'

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

    dealData(){
        this.setState({
            dialogShow: true
        })
    }

    render(){
        return (
            <div>
                <div className="cp_input-form">
                    <Input type="text" placeholder="请输入您的手机号" onChange={this.handleChange.bind(this, phone)}/>
                    <Input type="password" placeholder="密码6-18位大小写英文和数字" onChange={this.handleChange.bind(this, password)}/>
                    <Input type="text" actionType="phone" placeholder="请输入验证码" onChange={this.handleChange.bind(this, code)} />
                </div>
                <Button className="login-submit" onClick={this.dealData.bind(this)}>登录</Button>
                <div className="ft-action">
                    <Link to="/login">登录</Link>
                    <Link to="/register">注册</Link>
                </div>
                <Toast show={false}/>
            </div>
        )
    }
}