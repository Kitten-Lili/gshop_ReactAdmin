/**
 * 包含n个action creator函数的模块
 */
import {SET_HEAD_TITLE,RECEIVE_USER,RESET_USER} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'
import { message } from 'antd'

// 设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

// 退出登录的同步action
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  // 返回action对象
  return {type: RESET_USER}
}

// 登录的异步action
export const login = (username, password) => {
  return async dispatch => {
    // 执行异步ajax请求
    const result = await reqLogin(username,password)
    // 执行成功，分发成功的同步action
    if(result.status === 0){
      const user = result.data
      // 保存到load中
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    }else{
      // 执行失败，分发失败的同步action
      // const msg = result.msg
      message.error('登录失败')
    }
  }
}