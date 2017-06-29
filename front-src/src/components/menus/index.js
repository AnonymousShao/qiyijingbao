import React, {Component} from 'react'
import Carousel from '../carousel'
import './style.scss'

export default class Menus extends Component{

    state = {
        currentPage: 0
    }

    menu = [
        [
            {name: '中国书画', type: 'G'},
            {name: '西画雕刻', type: 'X'},
            {name: '瓷画陶器'},
            {name: '珠宝翡翠'}],
        [
            {name: '玉石文玩'},
            {name: '工艺杂项'},
            {name: '古典家具'},
            {name: '佛教珍藏'}]
    ]

    style = {
        wrap: {
            display: 'flex',
            flexFlow: 'noWrap',
        },
        title: {
            width: document.body.clientWidth / 4,
            flexShrink: 0,
            textAlign: 'center',
            padding: '10px 0'
        },
        arrow: {
            position: 'relative',
        },
        arrowRev: {
            padding: '10px 2px',
            position: 'absolute',
            left: 0, top: 0,
            height: '100%',
            boxSizing: 'border-box',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
        },
        arrowImg: {
            top: '50%',
        }
    }

    handleClick(action){
        this.refs.carousel[action]()
    }

    onAfterChange(target){
        this.setState({
            currentPage: target
        })
    }

    onBeforeChange(){

    }

    render(){
        const settings = {
            dots: false,
            infinite: false,
            slidesToShow: 1,
            initialSlide: this.state.currentPage,
            slidesToScroll: 1
        }

        return (
            <div style={{position: 'relative', backgroundColor: 'white'}}>
                <Carousel ref='carousel' settings={settings}
                          onBeforeChange={this.onBeforeChange.bind(this)}
                          onAfterChange={this.onAfterChange.bind(this)}>
                    {this.menu.map(m=>(
                        <div>
                            <div className="menu-wrap">
                                {m.map(mm=>(
                                    <span className={'menu-title'}>
                                        <span className={'title ' + (mm.type==='G'?'active':'')}>{mm.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}</Carousel>
            </div>
        )
    }
}
