import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../components/search_head_lite'
import Carousel from '../../components/Carousel'
import { Button, ButtonArea } from '../../components/button'
import Schedule from './schedule'
import Footer from '../../components/footer'
require('./style.scss')

class Menus extends Component{

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
            <div style={{position: 'relative'}}>
                {/*{this.state.currentPage!==(0)?(<span style={this.style.arrowRev} onClick={this.handleClick.bind(this, 'slickPrev')}>*/}
                    {/*<img style={Object.assign({}, this.style.arrowImg, {transform: 'rotate(180deg)'})}*/}
                         {/*src={require('../../assets/images/auction/ic_more.png')} alt=""/>*/}
                {/*</span>):null}*/}
                <Carousel ref='carousel' settings={settings}
                          onBeforeChange={this.onBeforeChange.bind(this)}
                          onAfterChange={this.onAfterChange.bind(this)}>
                    {this.menu.map(m=>(
                        <div>
                            <div className="menu-wrap">
                                {this.state.currentPage!==(0)
                                    ?(<span style={this.style.arrow} onClick={this.handleClick.bind(this, 'slickPrev')}>
                                    <img style={Object.assign({}, this.style.arrowImg, {transform: 'rotate(180deg)'})}
                                         src={require('../../assets/images/auction/ic_more.png')} alt=""/></span>)
                                    :null}
                                {m.map(mm=>(
                                    <span className={'menu-title'}>
                                        <span className={'title ' + (mm.type==='G'?'active':'')}>{mm.name}</span>
                                    </span>
                                ))}
                                {this.state.currentPage!==(this.menu.length-1)
                                    ?(<span style={this.style.arrow} onClick={this.handleClick.bind(this, 'slickNext')}>
                                    <img style={this.style.arrowImg} src={require('../../assets/images/auction/ic_more.png')} alt=""/>
                                </span>)
                                    :null}
                            </div>
                        </div>
                    ))}</Carousel>
                {/*{this.state.currentPage!==(this.menu.length-1)?(<span style={this.style.arrow} onClick={this.handleClick.bind(this, 'slickNext')}>*/}
                    {/*<img style={this.style.arrowImg} src={require('../../assets/images/auction/ic_more.png')} alt=""/>*/}
                {/*</span>):null}*/}
            </div>
        )
    }
}

class Adv extends Component{

    settings = {
        dots: true,
        dotsClass: 'dots',
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    render(){
        return (
            <div>
                <Carousel settings={this.settings}>
                    {[1,2,3,4,5].map(i=>(
                        <div className="carousel-container"
                             style={{backgroundImage: `url(${require('../../assets/images/img_source/img_11.png')})`}} />
                    ))}
                </Carousel>
            </div>
        )
    }
}

class Controller extends Component{

    state = {
        active: 'notice'
    }

    handleClick(type){
        this.setState({
            active: type
        })
    }

    settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    style = {
        container: {
            padding: 15,
            backgroundColor: 'white',
            marginBottom: 15
        }
    }

    render(){
        return (
            <div>
                <div style={this.style.container}>
                    <Carousel settings={this.settings} style={{marginBottom: 15}}>
                        {[1,2,3,4,5].map(i=>(
                            <div className="carousel-container"
                                 style={{height: 70, backgroundImage: `url(${require('../../assets/images/img_source/img_14.png')})`}} />
                        ))}
                    </Carousel>
                    <ButtonArea direction="horizontal">
                        <Button size="small" type={this.state.active==='notice'?'primary':'default'}
                                onClick={this.handleClick.bind(this, 'notice')}>竞拍须知</Button>
                        <Button size="small" type={this.state.active==='news'?'primary':'default'}
                                onClick={this.handleClick.bind(this, 'news')}>竞拍资讯</Button>
                        <Button size="small" type={this.state.active==='share'?'primary':'default'}
                                onClick={this.handleClick.bind(this, 'share')}>分享给朋友</Button>
                    </ButtonArea>
                </div>

                <Schedule/>
            </div>
        )
    }
}


const Root = () => (
    <div>
        <Header />
        <div>
            <Menus/>
            <Adv />
            <Controller />
            <Footer/>
        </div>
    </div>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
