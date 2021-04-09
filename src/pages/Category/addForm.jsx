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
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    // categorys: PropTypes.array.isRequired, // 二级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类Id
    categorysOne: PropTypes.array.isRequired
  }
  formRef = React.createRef()
  onFinish = (values)=>{
  }

  componentDidMount(){
    this.props.setForm(this.formRef)
  }
  
  render() {
    const {parentId,categorysOne} = this.props
    return (
      <Form
        name="add_form"
        initialValues={{ remember: true }}
        ref={this.formRef}
        onFinish={this.onFinish}
      >
        <Form.Item
          name='parentId'
          initialValue={parentId}
        >
          <Select style={{width:'100%'}}>
            <Option value='0'>一级分类</Option>
            {
              categorysOne.map(c=><Option value={c._id}>{c.name}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          name='categoryName'
          rules={[
            {required:true,message:'分类名必须指定'}
          ]}
        >
          <Input placeholder='请输入分类名称'/>
        </Form.Item>
      </Form>
    )
  }
}