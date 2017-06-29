import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Head from '../../components/search_head_lite'
import Carousel from '../../components/carousel'
import { Button, ButtonArea } from '../../components/button'
import Schedule from './schedule'
import Menus from '../../components/menus'
import Footer from '../../components/footer'
import Search from "../../components/search/index";
require('./style.scss')


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
                <div className="board-container">
                    <a href="/auction_history_list.html">
                        <Button style={{backgroundSize: 'cover', backgroundImage: `url(${require('../../assets/images/btn_2.png')})`}}>历史场次回顾</Button>
                    </a>
                </div>
            </div>
        )
    }
}

class Header extends Component{
    state = {
        showSearch: false
    }

    render(){
        return (
            <div>
                <Head onSearchClick={e=>this.setState({showSearch: true})}/>
                {this.state.showSearch?<Search hideSearch={e=>this.setState({showSearch: false})}/>:null}
            </div>)
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
