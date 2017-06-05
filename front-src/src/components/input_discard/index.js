import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'

export default class Input extends Component{

    componentWillMount(){
        this.state = {
            type: this.props.type
        }
    }

    showPwd(){
        this.setState({
            type: this.state.type==='text'?'password': 'text'
        })
    }

    render(){
        return (
            <div className={style.wrap}>
                <span className={style.inputHeader}>11</span>
                <div className={style.inputWrap}>
                    <input className={style.input} type={this.state.type}/>
                </div>
                <span className={style.codeBox}>
                    <img style={{width:'100%', height: '100%'}} src="/users"/>
                </span>
                {this.props.type==='password'?(
                    <span className={style.showPwd} onTouchEnd={this.showPwd.bind(this)}>
                    show
                </span>
                ):null}
            </div>
        )
    }
}