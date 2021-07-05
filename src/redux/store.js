/**
 * redux核心管理对象
 */
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
// 向外暴露默认store
export default createStore(reducer,applyMiddleware(thunk))