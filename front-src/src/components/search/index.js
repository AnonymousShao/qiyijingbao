import React, {Component} from 'react'
import './style.scss'

export default class Search extends Component{

    componentDidMount(){
        this.refs.input.focus()
    }

    search(){
        alert('search!')
        this.props.hideSearch()
    }

    render(){
        return (
            <div className="search__container">
                <div onClick={e=>{e.stopPropagation()}} className="search__container__header">
                    <span className="search__container__back" onClick={this.props.hideSearch}>《</span>
                    <input ref="input" className="search__container__input" type="text" placeholder="请输入"/>
                    <span className="search__container__btn" onClick={this.search.bind(this)}>搜索</span>
                </div>
            </div>
        )
    }
}