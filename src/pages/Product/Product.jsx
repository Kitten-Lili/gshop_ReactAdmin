import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import './product.less'

import ProductHome from './Home'
import ProductAddUpdate from './AddUpdate'
import ProductDetail from './Detail'

// 商品分类路由
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}
