import React, {Component} from 'react'
import './style.scss'

export default class Accordion extends Component{

    state = {
        scrollHeight: '',
        show: !!this.props.isDefaultShow || false
    }

    componentDidMount(){
        this.setHeight()
    }

    setHeight(){
        const scrollHeight = this.refs.info.scrollHeight
        this.setState({scrollHeight: scrollHeight})
    }

    toggleClick(){
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        return (
            <div className="accordion-wrap">
                <div className="accordion-title" onClick={this.toggleClick.bind(this)}>{this.props.title}<span className="fr">&gt;</span></div>
                <div ref="info" className="accordion" style={this.state.show?{maxHeight: this.state.scrollHeight}:null}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}