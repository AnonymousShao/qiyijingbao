import React, {Component} from 'react'
import { SearchBar } from '../button'
import { ge} from '../../helper/query_string'
import './style.scss'

export default class Search extends Component{

    state = {
        value: ''
    }

    componentDidMount(){
        this.refs.input.focus()
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        })
    }

    search(){
        window.location.href = '/search.html?q='+this.state.value
        this.props.hideSearch()
    }

    render(){
        return (
            <div className="search__container" onClick={this.props.hideSearch}>
                <div onClick={e=>{e.stopPropagation()}}>
                    <SearchBar
                        onSubmit={this.search.bind(this)}
                    />
                </div>
            </div>
        )
    }
}