import React, { Component } from 'react'
import {
  Card,
  Select,
  Input ,
  Button,
  Table,
  message
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from './constants'

// 商品管理的默认页面
export default class ProductHome extends Component {
  
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 搜索的类型
  }

  // 初始化table的列的数组
  initColumns = () => {    
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (price) => {
          return '￥' + price // 当前指定了对应的属性，传入的时对应的属性值
        }
      },
      {
        title: '状态',
        key: 'status',
        render: (product) => {
          const {status,_id} = product
          return (
            <span>
              <Button type='primary' onClick={()=>this.updateStatus(status===1?2:1,_id)}>{status===1?'下架':'上架'}</Button>
              <span>{status===1?'在售':'已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        key: 'product',
        render: (product) => {
          return (
            <span>
              <a href="javascript:;" onClick={()=>this.props.history.push('/product/detail',{product})}>详情</a>&nbsp;&nbsp;
              <a href="javascript:;" onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</a>
            </span>
          )
        }
      }
    ]
  }

  // 获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    const {searchName,searchType} =  this.state
    let result
    if(searchName){
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    }else{
      result = await reqProducts(pageNum,PAGE_SIZE)
    }
    if(result.status === 0){
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  // 更改商品的状态
  updateStatus = async (status,productId) => {
    const result = await reqUpdateStatus(productId,status)
    if(result.status===0){
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }
  
  componentDidMount(){
    this.initColumns()
    this.getProducts(1)
  }

  render() {

    const { Option } = Select;

    const {products, total, searchName, searchType} = this.state
    
    const title = (
      <span>
        <Select value={searchType} style={{width:150}} 
          onChange={value => this.setState({searchType:value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' value={searchName} style={{width:200,margin: '0 15px'}} 
          onChange={event=>this.setState({searchName: event.target.value})} />
        <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
        <PlusOutlined />
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table dataSource={products} columns={this.columns} rowKey='_id' bordered pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true, total, current: this.pageNum, onChange: (pageNum) => {this.getProducts(pageNum)}}}/>
      </Card>
    )
  }
}
