import {applyMiddleware} from 'redux'
import reduxPromise from 'redux-promise'

const tm = store => next => action =>{
    next(action)
}

const update = store => next => action => {

}

export default applyMiddleware(tm)
