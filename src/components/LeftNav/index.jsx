import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

import logo from '../../assets/images/logo.png'

import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'

import './index.less'

const { SubMenu } = Menu;

class LeftNav extends Component {
  // 判断当前用户是否有该菜单项权限
  hasAuth = (item) => {
    const {key,isPublic} = item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /**
     * 如果当前用户是admin
     * 当前item是否公开
     * 当前用户有item的权限 --- indexOf: 找到返回下标,没有返回-1
     */
    if(username==='admin' || isPublic || menus.indexOf(key)!==-1){
      return true
    }else if(item.children){
      // 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child=>menus.indexOf(child.key)!==-1)
    }
    return false
  }

  // 根据 menu 的数据数组生成对应的标签数组  使用map() + 递归调用
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
      return
    })
  }

  // 根据 menu 的数据数组生成对应的标签数组  使用reduce() + 递归调用
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      // 如果当前用户有item对应的权限,才需要显示对应的菜单项
      if (this.hasAuth(item)) {

        // 向pre添加<Menu.Item>
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key} icon={<PieChartOutlined />} >
              <Link to={item.key}>
                {item.title}
              </Link>
            </Menu.Item>
          ))
        } else {
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            this.openKey = item.key
          }

          pre.push((
            <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }
      // 向pre添加<SubMenu>
      return pre
    }, [])
  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    // 得到当前请求的路由路径
    let path = this.props.location.pathname
    const openKey = this.openKey

    if (path.indexOf('/product') === 0) {
      // 当前请求的是商品及其子路由界面
      path = '/product'
    }

    return (
      <div to='/' className="left_nav">
        <Link className="left_nav_header" to='/home'>
          <img src={logo} alt="" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >

          {
            this.menuNodes
          }

        </Menu>
      </div>
    )
  }
}

/**
 * withRouter 高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性，history，location，match
 */
export default withRouter(LeftNav)