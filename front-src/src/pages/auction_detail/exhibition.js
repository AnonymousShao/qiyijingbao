import React, {Component} from 'react'
import Carousel from '../../components/carousel'
import { imageHost } from '../../helper/config'


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
        prevArrow: <LeftNavButton/>,
        nextArrow: <RightNavButton/>
    }

    state = {
        exhibitImage: require('../../assets/images/img_source/img_11.png')
    }

    render(){
        return (<div>
            <Carousel settings={this.settings}>
                {this.props.list.map(img=><div
                    className="carousel-container"
                    style={{backgroundImage: `url(${imageHost + img.ImgUrl})`}}>
                </div>)}
            </Carousel>
        </div>)
    }
}