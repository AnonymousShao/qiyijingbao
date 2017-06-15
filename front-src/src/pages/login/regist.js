import React, {Component} from 'react'
import weui from 'react-weui'
import Input from '../../components/input'
import {Link} from 'react-router-dom'
import setTitle from '../../helper/fix-title'
const { Toast, Dialog, Button } = weui
import { register } from '../../helper/http'

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
            checked: false
        }
    }
    componentWillMount(){
        setTitle('注册')
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
        const data = {
            phone: this.state[phone],
            password: this.state[password],
            code: this.state[code],
            imgCode: this.state[imgCode]
        }
        if(!data.phone||!data.password||!data.code||!data.imgCode){
            return
        }
        register(data).then(data=>{

        })
    }

    render(){
        return (
            <div>
                <div className="cp_input-form">
                    <Input type="text" actionType="phone" placeholder="请输入您的手机号" onChange={this.handleChange.bind(this, phone)}/>
                    <Input type="password" actionType="password" placeholder="密码6-18位大小写英文和数字" onChange={this.handleChange.bind(this, password)}/>
                    <Input type="text" actionType="imgCode" placeholder="请输入图形验证码" onChange={this.handleChange.bind(this, imgCode)}/>
                    <Input type="text" actionType="code" placeholder="请输入验证码" onChange={this.handleChange.bind(this, code)} />
                </div>
                <Button className="login-submit" onClick={this.dealData.bind(this)}>注册</Button>
                <div className="ft-action">
                    <span>
                        <CheckBox checked={this.state.checked} onChange={this.handleChange.bind(this, 'checked')}/>
                        <span style={{verticalAlign: 'text-top'}}>同意《天宝用户注册协议》</span>
                    </span>
                    <Link to="/login">登录</Link>
                </div>
            </div>
        )
    }
}

