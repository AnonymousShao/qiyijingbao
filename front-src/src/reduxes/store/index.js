import { createStore } from 'redux';
import reducers from '../reducers'
import middleWares from '../middlewares'

export const store = createStore(reducers, middleWares);
