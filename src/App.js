/**
 * 应用的根组件
 */

import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Admin from './pages/Admin/Admin.jsx'

export default class App extends Component{
  render(){
    return (
      <BrowserRouter> {/* 包裹路由组件 */}
        <Switch> {/* 只匹配其中一个 */}
          <Route path='/login' component={Login}></Route> {/* login路由组件 */}
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}