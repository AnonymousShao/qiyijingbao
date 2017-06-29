import React, {Component} from 'react'
import {Type4} from "../../components/Image_text_items/index";

export default class ListController extends Component{

    state = {
        view: 'exhibition'
    }

    itemList = [
        {
            name: '',
            src: require('../../assets/images/auction/img_CN painting.png')
        }, {
            name: '',
            src: require('../../assets/images/auction/img_CN painting.png')
        }, {
            name: '',
            src: require('../../assets/images/auction/img_CN painting.png')
        }, {
            name: '',
            src: require('../../assets/images/auction/img_CN painting.png')
        }, {
            name: '',
            src: require('../../assets/images/auction/img_CN painting.png')
        }
    ]

    render(){
        return (
            <div style={{backgroundColor: 'white'}}>
                <div className="menu-set">
                    <span className={"menu-btn " + (this.state.view==='exhibition'?'active':'')}
                          onClick={e=>this.setState({view: 'exhibition'})}
                    >拍品浏览</span>
                    <span className={"menu-btn " + (this.state.view==='news'?'active':'')}
                          onClick={e=>this.setState({view: 'news'})}
                    >成交记录</span>
                    <span className={"menu-btn " + (this.state.view==='reference'?'active':'')}
                          onClick={e=>this.setState({view: 'reference'})}
                    >拍品资讯</span>
                </div>
                <div>
                    <ul>
                        {this.itemList.map(item=><Type4 {...item} />)}
                    </ul>
                </div>
            </div>
        )
    }
}
