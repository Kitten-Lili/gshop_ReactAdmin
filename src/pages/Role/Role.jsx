import React, { Component } from 'react'
import{
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import AddForm from './AddForm'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api'
import AuthForm from './AuthForm'
import { formateDate } from '../../utils/dateUtils'
import { connect } from 'react-redux'

// 角色管理路由
class Role extends Component {

  auth = React.createRef()

  state = {
    roles: [], // 所有角色的列表
    role: {}, // 选中的role
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name'
      }
    ]
  }

  onRow = (role) => {
    return {
      onClick: event => {
        // 点击行的事件
        this.setState({
          role
        })
      } 
    }
  }

  getRoles = async () => {
    const result =  await reqRoles()
    if(result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  // 添加角色
  addRole = () => {
    // 进行表单验证
    this.form.current.validateFields().then( async (values)=>{
      // 隐藏确定框
      this.setState({
        isShowAdd:false
      })
      const {roleName} = values // 获取上传的表单数据
      // 发送请求
      const result = await reqAddRole(roleName)
      if(result.status === 0){
        message.success('添加成功')
        this.getRoles()
      }else{
        message.success('添加失败')
      }
    }).catch(()=>{
      message.error('请求失败')
    })
    // 收集输入数据
  }

  // 添加权限
  updateRole = async () => {
    const role = this.state.role
    this.setState({
      isShowAuth:false
    })
    // 获取最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = this.props.user.username
    const result = await reqUpdateRole(role)
    if(result.status === 0){
      // 请求成功
      message.success('设置角色权限成功')
      this.getRoles()
    }
  }
  
  componentDidMount () {
    this.initColumn()
    this.getRoles()
  }
  
  render() {

    const {roles,role,isShowAdd,isShowAuth} = this.state


    const title = (
      <span>
        <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>&nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={()=>this.setState({isShowAuth:true})}>设置角色权限</Button>
      </span>
    )
    
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize:5}}
          rowSelection={{type:'redio',selectedRowKeys: [role._id],onSelect:(role)=>{this.setState({role})}}}
          onRow={(record)=>this.onRow(record)}
        />
        <Modal
          title="添加角色"
          centered
          destroyOnClose={true}
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {this.setState({
            isShowAdd: false
          })}}
        >
          <AddForm setForm={(form) => this.form = form} />
        </Modal>

        <Modal
          title="设置角色权限"
          centered
          destroyOnClose={true}
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {this.setState({
            isShowAuth: false
          })}}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    )
  }
}
export default connect(
  state => ({
    user: state.user
  }),
  {}
)(Role)