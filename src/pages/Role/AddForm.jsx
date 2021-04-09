import React, { Component } from 'react'
import {
  Form,
  Select,
  Input,
} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 
  }
  formRef = React.createRef()
  onFinish = (values)=>{
  }

  componentDidMount(){
    this.props.setForm(this.formRef)
  }
  
  render() {
    const {parentId,categorysOne} = this.props
    
    const formItemLayout = {
      labelCol: { span : 4 },
      wrapperCol: { span : 16 }
    }

    return (
      <Form
        name="add_form"
        initialValues={{ remember: true }}
        ref={this.formRef}
        onFinish={this.onFinish}
      >
        <Form.Item
          name='roleName'
          label='角色名称'
          {...formItemLayout}
          rules={[
            {required:true,message:'角色名必须指定'}
          ]}
        >
          <Input placeholder='请输入角色名称'/>
        </Form.Item>
      </Form>
    )
  }
}