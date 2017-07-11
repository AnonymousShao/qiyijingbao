import React, {Component} from 'react'
import {Type4, TypeHistory} from "../../../components/Image_text_items/index";

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
                    <span className={"menu-btn " + (this.state.view==='history'?'active':'')}
                          onClick={e=>this.setState({view: 'history'})}
                    >成交记录</span>
                    <span className={"menu-btn " + (this.state.view==='news'?'active':'')}
                          onClick={e=>this.setState({view: 'news'})}
                    >拍品资讯</span>
                </div>
                <div>{this.state.view==='exhibition'
                        ?<ul>{this.props.list.map(item=><Type4 {...item} />)}</ul>:null}
                    {this.state.view==='history'
                        ?<ul>{this.props.historyList.map(item=><TypeHistory {...item} />)}</ul>:null}
                    {this.state.view==='news'
                        ?<ul>{this.props.list.map(item=><Type4 {...item} />)}</ul>:null}
                </div>
            </div>
        )
    }
}
