// 用来根据老的state和指定的action生成并返回新的state的函数
import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'
import {SET_HEAD_TITLE,RECEIVE_USER,RESET_USER} from './action-types'

// 头部标题
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle,action){
  switch(action.type){
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

// 当前登录用户
const initUser = storageUtils.getUser()
function user(state = initUser,action){
  switch(action.type){
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {}
    default:
      return state
  }
}

// 暴露多个reducer函数，合并产生的总reducer函数
export default combineReducers({
  headTitle,
  user
})