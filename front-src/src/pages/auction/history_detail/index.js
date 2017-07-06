import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import './style.scss'
import Menus from "../../../components/menus/index";
import Carousel from "../../../components/carousel/index";
import InfoBoard from "../../../components/auction/info/index";
import ListController from "./list";

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
                             style={{backgroundImage: `url(${require('../../../assets/images/img_source/img_11.png')})`}} />
                    ))}
                </Carousel>
            </div>
        )
    }
}


class Main extends Component{

    render(){
        return (
            <div>
                <Menus/>
                <div>
                    <Adv/>
                    <InfoBoard history="true"/>
                    <ListController/>
                </div>
            </div>
        )
    }
}

const Root = () => {
    return (
        <div>
            <Header/>
            <Main/>
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
