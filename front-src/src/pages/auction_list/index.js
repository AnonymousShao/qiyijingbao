import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../../components/carousel'
import Header from '../../components/header'
import Menus from '../../components/menus'
import ListController from './lists'
import Footer from '../../components/footer'
import InfoBoard from "../../components/auction/info/index";

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


const Root = ()=>{
    return (
        <div>
            <Header />
            <div>
                <Menus/>
                <Adv/>
                <InfoBoard/>
            </div>
            <ListController />
            <Footer />
        </div>
    )
}


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
