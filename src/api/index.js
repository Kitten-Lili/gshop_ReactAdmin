/**
 * API接口请求函数
 */
import ajax from './ajax'
// import jsonp from 'jsonp'

// 登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')


// // json请求的接口请求函数
// export const reqWeather = (city) => {
//   return new Promise((resolve, reject) => {
//     const url = `http://api.map.baidu.com/weather/v1/?district_id=${city}&data_type=all&output=JSON&ak=j0AwNLWNag9gOGHvgdMKmTzB5WGe8j1F`
//     jsonp(url, {}, (err, data) => {
//       console.log('jsonp');
//       console.log('jsonp', err, data);
//     })
//   })
// }
// reqWeather('440111')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId})
// 添加分类
export const reqAddCategory = (categoryName,parentId) => ajax('/manage/category/add',{categoryName,parentId},'POST')
// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST')
// 根据ID获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info',{categoryId})


// 获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize})
/**
 * 搜索商品分页列表
 * @pageNum  页码
 * @pageSize  每页条目
 * @searchName  搜索的值
 * @searchType  搜索类型, 值为: productName / productDesc
 */
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax('/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
// 更新商品的状态（上架和下架）
export const reqUpdateStatus = (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')

// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add',{roleName},'POST')
// 添加角色权限 ---> role本身就是对象
export const reqUpdateRole = (role) => ajax('/manage/role/update',role,'POST')

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete',{userId},'POST')
// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')
// 更改用户
export const reqUpdateUser = (user) => ajax('/manage/user/update', user, 'POST')