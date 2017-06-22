import React, {Component} from 'react'
require('./style.scss')

export default class Toast extends Component{

    style = {

    }

    state = {
        msg: ''
    }

    display(msg){
        const classList = document.body.classList
        for(let i=0;i<classList.length;i++){
            if(classList[i] !== 'toast-on-body'){
                continue
            }
            return
        }
        this.setState({
            msg
        })
        document.body.className += ' toast-on-body'
    }

    hidden(){
        document.body.className = document.body.className.replace('toast-on-body', '')
    }

    render(){
        return (
            <div className="toast-bg">
                <p>
                    {this.props.children}
                </p>
            </div>
        )
    }
}

