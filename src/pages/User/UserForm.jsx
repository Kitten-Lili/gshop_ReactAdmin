import React, { PureComponent } from 'react'
import {
  Form,
  Select,
  Input,
} from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option

export default class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象
    roles: PropTypes.array.isRequired, // 角色权限列表
    user: PropTypes.object.isRequired, // 更新的角色
  }
  formRef = React.createRef()
  onFinish = (values) => {
  }

  componentDidMount() {
    this.props.setForm(this.formRef)
  }

  render() {
    const { roles } = this.props
    const user = this.props.user || {}
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form
        name="user_form"
        initialValues={{ remember: true }}
        ref={this.formRef}
        onFinish={this.onFinish}
      >
        <Form.Item
          name='username'
          label='用户名称'
          initialValue={user.username}
          {...formItemLayout}
          rules={[
            { required: true, message: '用户名必须指定' }
          ]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        {
          user._id ? null : (
            <Form.Item
              name='password'
              label='密码'
              {...formItemLayout}
              rules={[
                { required: true, message: '密码必须指定' }
              ]}
            >
              <Input type='password' placeholder='请输入密码' />
            </Form.Item>
          )
        }
        <Form.Item
          name='phone'
          label='手机号'
          initialValue={user.phone}
          {...formItemLayout}
          rules={[
            { required: true, message: '手机号必须指定' }
          ]}
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          name='email'
          label='邮箱'
          initialValue={user.email}
          {...formItemLayout}
          rules={[
            { required: true, message: '邮箱必须指定' }
          ]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        <Form.Item
          name='role_id'
          label='角色'
          initialValue={user.role_id}
          {...formItemLayout}
          rules={[
            { required: true, message: '角色必须指定' }
          ]}
        >
          <Select placeholder='请选择角色'>
            {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    )
  }
}