import React, { Component } from 'react'
import { Form, Input, Button, Checkbox ,message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import './login.less'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router'

// 登录的路由组件
export default class Login extends Component {

  formRef = React.createRef()

  onFinish = (values)=>{
    this.formRef.current.validateFields().then(async ()=>{
        const {username,password} = values
        // reqLogin(username,password).then(response => {
        //   // console.log(response.data)
        //   if(response.data.status === 1) {
        //     console.log('用户名密码不正确');
        //     return
        //   }
        //   console.log(response.data);
        // }).catch(erros => {
        //   console.log(erros);
        // })
        const response = await reqLogin(username,password)
        if(response.status === 1) {
          // console.log('用户名密码不正确');
          message.error('用户名密码不正确')
          return
        }

        // 保存user
        const user = response.data
        memoryUtils.user = user
        storageUtils.saveUser(user)

        // console.log(response.data);
        message.success('登录成功')
        // 跳转到管理界面
        this.props.history.replace('/')
      }
    ).catch(()=>{
        console.log('验证失败')
      }
    )
  }
  

  validatorPwd = (rule, value, callback)=>{
    if(!value){
      callback('密码必须输入')
    }else if(value.length < 4){
      callback('密码长度不能小于4')
    }else if(value.length > 12){
      callback('密码长度不能大于12')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须式英文、数字或下划线组成')
    }else{
      callback() // 验证通过
    }
  }
  
  render() {
    // 如果用户已经登录,自动跳转
    if(memoryUtils.user._id){
      return <Redirect to="/" />
    }

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              // 声明式验证
              rules={[{ required: true,whitespace: true, message: '请输入用户名!'},{min: 4, message: '用户名长度不能小于4'},{max: 12, message: '用户名长度不能大于12'},{pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{
                validator: this.validatorPwd
              }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}