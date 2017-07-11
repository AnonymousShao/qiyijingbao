import React, {Component} from 'react'
import Carousel from '../carousel'
import './style.scss'

export default class Menus extends Component{

    state = {
        currentPage: parseInt(this.props.no) > 4?1:0,
        currentNo: parseInt(this.props.no) || 1
    }

    menu = [
        [
            {name: '中国书画', type: 'G', no: 1},
            {name: '西画雕刻', type: 'X', no: 2},
            {name: '瓷画陶器', type: '', no: 3},
            {name: '珠宝翡翠', type: '', no: 4}],
        [
            {name: '玉石文玩', type: '', no: 5},
            {name: '工艺杂项', type: '', no: 6},
            {name: '古典家具', type: '', no: 7},
            {name: '佛教珍藏', type: '', no: 8}]
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

    changeMenu(item){
        this.setState({
            currentNo: item.no
        })
        this.props.onChange(item)
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
                                    <span onClick={this.changeMenu.bind(this, mm)} className={'menu-title'}>
                                        <span className={'title ' + (mm.no===this.state.currentNo?'active':'')}>{mm.name}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}</Carousel>
            </div>
        )
    }
}
