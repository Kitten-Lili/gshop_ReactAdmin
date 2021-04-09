/**
 * 进行local数据存储管理的工具模块
 */
import store from 'store'

const USER_KEY = 'user_key'

// 原生写法
// export default {
//   // 保存user
//   saveUser (user) {
//     localStorage.setItem(USER_KEY,JSON.stringify(user)) // value需要转换成json
//   },
//   // 读取user
//   getUser(){
//     return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
//   },
//   // 删除user
//   removeUser () {
//     localStorage.removeItem(USER_KEY)
//   }
// }

// 使用store库进行数据存储
export default {
  saveUser (user){
    store.set(USER_KEY,user)  // store库会自动帮你转换为json格式的字符串
  },
  getUser () {
    return store.get(USER_KEY) || {}
  },
  removeUser () {
    store.remove(USER_KEY)
  }
}