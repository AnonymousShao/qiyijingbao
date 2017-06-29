import React, {Component} from 'react'
import Slider from 'react-slick'
require('./style.scss')

export default class Carousel extends Component{

    prevX = 0
    currentPage = 0

    onTouchMove(e){
        if(this.prevX===null || this.prevX === e.touches[0].pageX){
            this.prevX = e.touches[0].pageX
            return
        }


        if(this.prevX < e.touches[0].pageX){
            if(this.currentPage!==0){
                e.stopPropagation()
            }else if(this.props.settings && (!this.props.settings.infinite)){
                e.preventDefault()
            }
        }

        if(this.prevX > e.touches[0].pageX){
            if(this.currentPage!==1){
                e.stopPropagation()
            } else if(this.props.settings && (!this.props.settings.infinite)){
                e.preventDefault()
            }
        }

        this.prevX = e.touches[0].pageX
    }

    onTouchStart(e){
        this.prevX = e.touches[0].pageX
    }

    slickNext(){
        this.refs.slider.slickNext()
    }

    slickPrev(){
        this.refs.slider.slickPrev()
    }

    onAfterChange(target){
        this.currentPage = target
        if(this.props.onAfterChange){
            this.props.onAfterChange(target)
        }
    }

    onBeforeChange(from, to){

    }

    render(){
        const settings = Object.assign({}, {
            arrows: false,
            speed: 500,
        }, this.props.settings);
        return (
            <div className={this.props.className} style={this.props.style}
                 onTouchStart={this.onTouchStart.bind(this)}
                 onTouchMove={this.onTouchMove.bind(this)}
            >
                {this.props.children.length?(
                    <Slider {...settings} ref="slider"
                            afterChange={this.onAfterChange.bind(this)}
                            beforeChange={this.onBeforeChange.bind(this)}
                    >
                        {this.props.children}
                    </Slider>
                ):null}
            </div>
        )
    }
}
