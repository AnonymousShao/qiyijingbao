import { combineReducers } from 'redux'
import {ALL_NEWS, CURRENTPAGE} from '../actions'

function allNews(store = [], action){
    switch(action.type){
        case ALL_NEWS: {
            return action.data
        }
        default: {
            return store
        }
    }
}

function currentPage(store={current: 1}, action) {
    switch (action.type){
        case CURRENTPAGE: {
            return {
                current: action.data
            }
        }
        default: {
            return store
        }
    }
}

export default combineReducers({
    allNews,
    currentPage
})