import React, {Component} from 'react'
import Carousel from "../../carousel/index";
import { imageHost } from '../../../helper/config'

export default class Adv extends Component{
    settings = {
        dots: true,
        dotsClass: 'dots',
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        adaptiveHeight: true,
        slidesToScroll: 1,
    }

    render(){
        return (
            <Carousel settings={this.settings}>
                {this.props.list.map(image=> {
                    const rate = (image.ImgHeight / image.ImgWidth) * window.screen.width / window.screen.height
                    return (
                        <div className="carousel-container"
                             style={{
                                 backgroundImage: `url(${imageHost + image.ImgUrl})`,
                                 height: (rate > 0.5 ?0.5:rate) * window.screen.height
                             }}/>)
                })}
            </Carousel>
        )
    }
}
