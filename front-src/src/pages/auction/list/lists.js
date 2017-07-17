import React, {Component} from 'react'
import './list.scss'
import {Type4} from "../../../components/Image_text_items/index";

export default class ListController extends Component{

    state = {
        view: 'exhibition'
    }

    render(){
        return (
            <div style={{backgroundColor: 'white'}}>
                <div className="menu-set">
                    <span className={"menu-btn " + (this.state.view==='exhibition'?'active':'')}
                        onClick={e=>this.setState({view: 'exhibition'})}
                    >拍品浏览</span>
                    <span className={"menu-btn " + (this.state.view==='news'?'active':'')}
                          onClick={e=>this.setState({view: 'news'})}
                    >拍品资讯</span>
                </div>
                <div>
                    <ul>
                        {this.props.list.map(item=><Type4 {...item}/>)}
                    </ul>
                </div>
            </div>
        )
    }
}
