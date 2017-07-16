import React, {Component} from 'react'
import './style.scss'
import {imageHost} from '../../helper/config'


export default class MoreImage extends Component{

    state = {
        rawHeight: 0,
        imgHeight: 0,
        show: false
    }
    componentDidMount(){
        let self = this;
        const width = this.props.width
        const height = this.props.height
        this.setHeight(width, height)

        this.refs.img.onload = function (event) {
            self.setHeight(this.width, this.height)
        }
    }

    setHeight(width, height){
        const rate = (height / width) * window.screen.width / window.screen.height
        this.setState({
            rawHeight: rate * window.screen.height,
            imgHeight: (rate > 0.5?0.5 : rate) * window.screen.height,
            show: rate < 0.5
        })
    }

    render(){
        return (
            <div className="more-image-container"
                 style={{maxHeight: this.state.show?this.state.rawHeight:this.state.imgHeight}}>
                <img ref="img" src={imageHost + this.props.image} alt=""/>
                {this.state.show?null:<div onClick={e=>this.setState({show: true})} className="controller">查看完整图片</div>}
            </div>
        )
    }
}