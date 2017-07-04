import React, {Component} from 'react'
import {Type5} from "../../components/Image_text_items/index";
import Carousel from "../carousel/index";


export default class Similar extends Component{

    settings = {
        infinite: false,
        autoplay: false,
        autoplaySpeed: 4000,
        slidesToShow: document.body.clientWidth / 160,
        slidesToScroll: Math.floor(document.body.clientWidth / 160),
        initialSlide: 0,
        lazyLoad: true
    }

    test(){
        this.setState({popupShow: false})
    }

    render(){
        return (
            <div className="board-container" style={{marginBottom: 10}}>
                <p className="center-title__wrap">
                    <strong className="center-title">同类题材出价参考</strong>
                </p>
                {this.props.list.length
                    ?<Carousel settings={this.settings}>
                        {this.props.list.map(item=>(<div><Type5 {...item}/></div>))}
                    </Carousel>
                    : <div style={{textAlign: 'center'}}>暂无参考作品</div>  }
            </div>
        )
    }
}

