/**
 * 能发送异步ajax请求的函数模块
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {
  return new Promise((resolve,reject)=>{
    let promise
    // 1.执行异步ajax请求
    if(type==='GET'){
      // const url = url
      promise =  axios.get(url,{
        // 配置对象
        params: data // 指定请求参数
      })
    } else { // POST请求
      promise =  axios.post(url,data)
    }
    
    // 2.如果成功了,调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      // 3.如果失败了,不调用reject(reason),而是提示异常信息
      message.error('请求失败' + error)
    })
  })
  
}