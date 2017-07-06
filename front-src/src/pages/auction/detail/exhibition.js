import React, {Component} from 'react'
import Carousel from '../../../components/carousel/index'
import { imageHost } from '../../../helper/config'


class LeftNavButton extends Component {
    settings = {
        className: 'slick-arrow__modified left'
    }
    render() {
        return <span {...Object.assign({}, this.props, this.settings)}>&lt;</span>
    }
}

class RightNavButton extends Component {
    settings = {
        className: 'slick-arrow__modified right'
    }
    render() {
        return <span {...Object.assign({}, this.props, this.settings)}>&gt;</span>
    }
}

export default class Exhibition extends Component{

    settings = {
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
        prevArrow: <LeftNavButton/>,
        nextArrow: <RightNavButton/>
    }

    state = {}

    render(){
        return (<div>
            <Carousel settings={this.settings}>
                {this.props.list.map(image=>{
                    const rate = (image.ImgHeight / image.ImgWidth) * window.screen.width / window.screen.height
                    return (<div
                        className="carousel-container"
                        style={{backgroundImage: `url(${imageHost + image.ImgUrl})`,
                            height: (rate > 0.5 ?0.5:rate) * window.screen.height
                        }}/>)})}
            </Carousel>
        </div>)
    }
}
