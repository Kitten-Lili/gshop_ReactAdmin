import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input,
} from 'antd'

export default class AddForm extends Component {
  formRef = React.createRef()
  
  onFinish = (values)=>{
  }
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.setForm(this.formRef)
  }

  render() {
    const {categoryName} = this.props
    return (
      <Form
        name="add_form"
        ref={this.formRef}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name= 'categoryName'
          initialValue= {categoryName}
          rules={
            [
              {required: true, message: '分类名称必须输入'}
            ]
          }
        >
          <Input />
        </Form.Item>
      </Form>
    )
  }
}