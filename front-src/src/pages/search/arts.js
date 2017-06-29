import React, {Component} from 'react'
import {Type1, Type2} from "../../components/Image_text_items/index";
import Accordion from "../../components/accordion/index";

export default class Arts extends Component{

    data1 = [
        {
            img: require('../../assets/images/img_source/img_13.png'),
            name: 'LOT号 竞品名称'
        }, {
            img: require('../../assets/images/img_source/img_13.png'),
            name: 'LOT号 竞品名称'
        }, {
            img: require('../../assets/images/img_source/img_13.png'),
            name: 'LOT号 竞品名称'
        }, {
            img: require('../../assets/images/img_source/img_13.png'),
            name: 'LOT号 竞品名称'
        },
    ]

    render(){
        return (
            <div>
                <div className="search-category">
                    {this.props.auctionList.length?<Accordion title="竞价">
                        <ul>{this.props.auctionList.map(item=><Type1 {...item}/>)}</ul>
                    </Accordion>:null}
                </div>

                <div className="search-category">
                    <Accordion title="议价">
                        <ul>{this.data1.map(item=><Type2 {...item}/>)}</ul>
                    </Accordion>
                </div>

            </div>
        )
    }
}