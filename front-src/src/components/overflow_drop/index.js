import React, {Component} from 'react'


export default class OverflowDrop extends Component{

    state = {
        clientHeight: '',
        scrollHeight: '',
        isOverflow: false,
        show: false
    }

    componentDidMount(){
        const scrollHeight = this.refs.content.scrollHeight
        const clientHeight = this.refs.content.clientHeight

        this.setState({scrollHeight: scrollHeight})
        this.setState({clientHeight: clientHeight})

        if(clientHeight < scrollHeight){
            this.setState({
                isOverflow: true
            })
        }
    }

    toggleInfo(){
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        return (
            <div>
                <div ref='content' className={"mh " + this.props.className} style={this.state.show
                    ?{maxHeight: this.state.scrollHeight}
                    :{maxHeight: this.state.clientHeight}}>
                    <p onClick={e=>this.setState({show: true})}>{this.props.content}</p>
                </div>
                {this.state.isOverflow?<div className="pull-down" onClick={this.toggleInfo.bind(this)}><i className={"iconfont icon-hricon39 rotate " + (this.state.show?'rotate180':'')} ></i></div>:null}
            </div>
        )
    }
}