import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import UserForm from './UserForm'
import {reqUsers,reqDeleteUser,reqAddUser,reqUpdateUser} from '../../api'

export default class User extends Component {
  state = {
    users: [],// 所有用户
    roles: [], // 角色列表
    isShowAdd: false, // 是否显示确定框
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <a onClick={()=>this.showUpdate(user)}>修改</a>&nbsp;&nbsp;
            <a onClick={()=>this.deleteUser(user)}>删除</a>
          </span>
        )
      }
    ]
  }

  // 根据role的数组,生成包含所有角色名的对象(属性名用角色id值)
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre,role)=>{
      pre[role._id] = role.name
      return pre
    },[])
    // 保存
    this.roleNames = roleNames
  }

  // 添加/更改用户
  addUser = () => {
    this.form.current.validateFields().then( async (values)=>{
      // 隐藏添加框
      this.setState({
        isShowAdd: false
      })
      // console.log(values);
      // 提交添加的请求
      let result
      if(this.user){
        values._id = this.user._id
        console.log(values);
        result = await reqUpdateUser(values)
      }else{
        result = await reqAddUser(values)
      }
      // 更新列表显示
      if(result.status === 0){
        message.success(`${this.user?'修改':'添加'}用户成功`)
        this.getUsers()
      }else{
        message.error(`${this.user?'修改':'添加'}用户失败`)
      }
    }).catch(()=>{
      message.error('请求失败')
    })
  }

  // 更新用户
  showUpdate = (user) => {
    this.user = user
    this.setState({
      isShowAdd: true
    })
  }

  // 删除指定用户
  deleteUser = (user) => {
    Modal.confirm({
      centered: true,
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if(result.status === 0){
          message.success('删除用户成功')
          this.getUsers()
        }
      }
    })
  }

  ShowAdd = () => {
    this.user = null
    this.setState({isShowAdd:true})
  }
  
  getUsers = async () => {
    const result = await reqUsers()
    if(result.status === 0){
      const {users,roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  constructor(props) {
    super(props)
    this.initColumns()
    this.getUsers()
  }

  render() {
    const { users,isShowAdd,roles } = this.state
    const user = this.user
    const title = <Button type='primary' onClick={this.ShowAdd}>创建用户</Button>
    return (
      <Card title={title}>
        <Table bordered rowKey='_id' dataSource={users} columns={this.columns} pagination={{defaultPageSize: 2}} />
        <Modal
          title={user?'修改用户':'添加角色'}
          centered
          destroyOnClose={true}
          visible={isShowAdd}
          onOk={this.addUser}
          onCancel={() => {
            this.setState({
              isShowAdd: false
            })
          }}
        >
          <UserForm setForm={(form) => this.form = form} roles={roles} user={user} />
        </Modal>
      </Card>
    )
  }
}
