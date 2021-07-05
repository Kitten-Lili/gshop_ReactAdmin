import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import {connect} from 'react-redux'

import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './index.less'
import {logout} from '../../redux/actions'

const { confirm } = Modal

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now())
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if(item.key === path){
        title = item.title
      }else if(item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }

  getTime = () => {
    this.intervalId=setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  // 退出登录
  logout = () =>{
    // 显示确认框
    Modal.confirm({
      // title: '你确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要退出吗',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: ()=>{
        // console.log('OK');
        // 删除保存的数据
        // storageUtils.removeUser()
        // memoryUtils.user = {}
        this.props.logout()
      }
    })
  }

  // 当前组件初始化完成时
  componentDidMount(){
    this.getTime()
  }

  // 当前组件注销前
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  
  render() {
    const {currentTime} = this.state
    // const title = this.getTitle()
    const title = this.props.headTitle
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{this.props.user.username}</span>
          <a href="#" onClick={this.logout}>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt=""/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(withRouter(Header))