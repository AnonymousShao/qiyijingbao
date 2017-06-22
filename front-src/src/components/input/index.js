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
        this.image = {
            phone: 'icon-shouji',
            code: '',
            imgCode: 'icon-tubiao',
            password: 'icon-yuechi',
            passwordOn: '',
            passwordOff: ''
        }
    }

    componentWillMount(){
        this.state = {
            image: '',
            type: this.props.type,
            seconds: 0,
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
        let countDown = () => {
            let next = this.state.seconds - 1
            this.setState({
                seconds: next
            })
            if(next > 0){
                setTimeout(countDown, 1000)
            }
        }
        this.props.onAction().then(res=>{
            if(res){
                this.setState({
                    seconds: 60,
                }, countDown)
            }
        })
    }

    handleChange(event){
        this.props.onChange(event.target.value)
    }


    render(){
        const iconClass = `iconfont ${this.image[this.props.actionType]}`

        return (
            <div className="cp_input-wrap">
                <span className="cp_input-hd">
                    {this.props.actionType!=='code'
                        ?<i style={{fontSize: '1.2em'}} className={iconClass} />
                        :<img style={{width: 20, paddingTop: 10}} src={this.images[this.props.actionType]} alt=""/>}
                </span>
                <div className="cp_input-input">
                    <input className={this.props.isError?'animated shake':''}
                           type={this.state.type} placeholder={this.props.placeholder||''} onChange={this.handleChange.bind(this)} />
                </div>
                {this.props.actionType==='imgCode'?(
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
                {this.props.actionType==='code'?(
                    this.state.seconds === 0
                        ?(<span className="cp_input-phone" onTouchEnd={this.sendCode.bind(this)}>发送至手机</span>)
                        :(<span className="cp_input-phone">{this.state.seconds}秒后重新获取</span>)
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