/**
 * 包含n个日期时间出阿里
 */

export function formateDate(time){
  if(!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}