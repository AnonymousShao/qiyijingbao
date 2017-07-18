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

export class MenuList extends Component{

    state = {
        currentPage: parseInt(this.props.no) > 4?1:0,
        currentNo: parseInt(this.props.no) || 1
    }

    onAfterChange(target){
        this.setState({
            currentPage: target
        })
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
            <div className="brb" style={{position: 'relative', backgroundColor: 'white'}}>
                <Carousel ref='carousel' settings={settings}
                          onAfterChange={this.onAfterChange.bind(this)}>
                    {this.props.list.map(m=>(
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