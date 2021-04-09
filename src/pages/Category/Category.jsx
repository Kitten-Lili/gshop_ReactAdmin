import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import {
  PlusOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api/index'
import AddForm from './addForm'
import UpdateForm from './updateFrom'

// 商品分类路由
export default class Category extends Component {
  state = {
    categorys: [], // 分类列表
    parentId: '0',  // 当前需要显示的分类列表的父分类ID
    parentName: '', // 当前需要显示的分类列表的父分类名称
    // subCategirys: [], // 二级分类列表
    categorysOne: [],
    showStatus: 0, //标识添加/更新的弹框是否显示,0:都不显示,1:显示添加,2:显示更新
  }

  // 判断是否显示查看子分类按钮
  isShowChile(category){
    if(this.state.parentId === '0'){
      return <a href="javascript:;" onClick={()=>{this.showSubCategorys(category)}}>查看子分类</a>
    }
  }
  
  // 初始化Table所有列的数组
  initColumns(){
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'category'
      },
      {
        key: 'action',
        title: '操作',
        width: 400,
        render: (category)=>( // 返回需要显示的界面标签
          <span>
            <a href="javascript:;" onClick={()=>{this.showUpdate(category)}}>修改分类</a>&nbsp;&nbsp;&nbsp;&nbsp;
            {this.isShowChile(category)}
          </span>
        )
      }
    ];
    console.log('initColumns');
  }
  
  // 异步获取一级/二级分类列表显示
  getCategorys = async (parentId = this.state.parentId) => {
    // 发异步ajax请求，获取数据
    const result = await reqCategorys(parentId)
    if(result.status === 0){
      const categorys = result.data
      this.setState({categorys})
    }else{
      message.error('获取分类失败')
    }
  }

  // 返回一级分类事件
  showFirstCate = () => {
    this.setState({
      parentName: '',
      parentId: '0'
    },()=>{
      this.getCategorys()
    })
  }

  // 查看子分类事件
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    },()=>{
      this.getCategorys()
    })
    this.state.categorysOne = this.state.categorys
  }

  // 显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示更新的确认框
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  // 响应点击取消: 隐藏确定框
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  // 添加分类
  addCategory =  () => {
    // 进行表单验证，只有通过了才处理
    this.form.current.validateFields().then( async () => {
      // 隐藏确定框
      this.handleCancel()
      // 收集数据
      const categoryName = this.form.current.getFieldsValue('categoryName').categoryName
      const parentId = this.form.current.getFieldsValue('parentId').parentId
      const result = await reqAddCategory(categoryName,parentId)
      if(result.status === 1){
        message.error(result.msg)
        return
      }
      if(result.status===0){
        if(parentId === this.state.parentId){
          // 重新显示列表
          this.getCategorys()
        }
      }
    }).catch(()=>{
      console.log('验证失败');
    })
  }
  
  // 更新分类
  updateCategory = () => {
    // 进行表单验证，只有通过了才处理
    this.form.current.validateFields().then( async (values)=>{
        // 隐藏确定框
        this.handleCancel()
    
        const categoryId = this.category._id
        const categoryName = values.categoryName
        
        // 发请求更新分类
        const result = await reqUpdateCategory({categoryId,categoryName})
        if(result.status === 1){
          message.error(result.msg)
          return
        }
        if(result.status===0){
          // 重新显示列表
          this.getCategorys()
        }
      }).catch(()=>{
      console.log('验证失败')
    })
  }
  
  componentDidMount(){
    this.initColumns()
    this.getCategorys()
  }

  render() {
    // 读取状态数据
    const {categorys,parentId,parentName,showStatus,categorysOne} = this.state
    
    // card的左侧
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <a href="javascript:;" onClick={this.showFirstCate}>一级分类列表</a>&nbsp;&nbsp;
        <ArrowRightOutlined />
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    )
    const category = this.category || {} // 如果还没有就指定空对象
    return (
      <Card title={title} extra={extra}>
        <Table dataSource={categorys} columns={this.columns} bordered rowKey='_id' pagination={{defaultPageSize: 5, showQuickJumper: true}}/>
        <Modal
          title="添加分类"
          centered
          destroyOnClose={true}
          visible={showStatus === 1}
          onOk={() => this.addCategory(false)}
          onCancel={() => this.handleCancel(false)}
        >
          <AddForm categorys={categorys} categorysOne={categorysOne} parentId={parentId} setForm={(form)=>{this.form = form}} />
        </Modal>
        <Modal
          title="修改分类"
          centered
          destroyOnClose={true}
          visible={showStatus === 2}
          onOk={() => this.updateCategory(false)}
          onCancel={() => this.handleCancel(false)}
        >
          <UpdateForm categoryName={category.name} setForm={(form)=>{this.form = form}} />
        </Modal>
      </Card>
    )
  }
}
