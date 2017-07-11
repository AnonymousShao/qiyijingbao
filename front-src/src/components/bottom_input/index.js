import React, {Component} from 'react'
import { Popup, Button } from '../button'
import './style.scss'

export default class BottomUp extends Component{

    constructor(props){
        super(props)
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }
    state = {
        show: false
    }

    test(){
        this.hide()
    }

    show(){
        this.setState({
            show: true
        })
    }

    hide(){
        this.setState({
            show: false
        })
    }

    render(){
        return (
            <div>
                <Popup
                    show={this.state.show}
                    onRequestClose={this.test.bind(this)}
                >
                    <div className="bottom-input__header">
                        <span>{this.props.title}</span>
                        <span className="fr" onClick={this.hide}>x</span>
                    </div>
                    <div className="bottom-input__body">
                        {this.props.children}
                    </div>
                    <div className="bottom-input__foot">
                        <Button onClick={this.props.onSubmit}>评论</Button>
                    </div>
                </Popup>
            </div>
        )
    }
}
