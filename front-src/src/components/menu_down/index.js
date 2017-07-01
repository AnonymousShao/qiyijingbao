import React, {Component} from 'react'
import './style.scss'



export default class MenuDown extends Component{

    state = {
        top: 0
    }

    componentDidMount(){}

    handleChange(item){
        this.props.onChange(item)
        this.props.toggleShow()
    }

    render(){
        return this.props.show?(
            <div className={this.props.background?'menu__bg':''} onClick={this.props.toggleShow}>
                <ul className="menu__container right" style={this.props.position} onClick={e=>e.stopPropagation()}>
                    {this.props.list.map(item=>
                        <li onClick={this.handleChange.bind(this, item)}>{item.url
                            ? <a href={item.url}>{item.name}</a>
                            : item.action
                                ?<span onClick={item.action}>{item.name}</span>
                                :item.name}
                        </li>
                    )}
                </ul>
            </div>
        ):null
    }
}
