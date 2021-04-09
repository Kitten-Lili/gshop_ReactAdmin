import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {reqCategorys} from '../../api'
const {TextArea} = Input


// 产品的添加和更新的子路由
export default class ProductAddUpdate extends Component {

  state = {
    optionLists: [],
    
  }

  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const optionLists = categorys.map(c=>({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))

    // 如果是一个二级分类商品的更新
    const {isUpdate, product} = this
    const {pCategoryId,categoryId} = product
    if(isUpdate && pCategoryId !== '0'){
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOption = subCategorys.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 找到当前商品对应的一级option对象
      const targetOption = optionLists.find(option => option.value === pCategoryId)
      // 关联到对应的一级option上
      targetOption.children = childOption
    }
    
    // 更新options状态
    this.setState({
      optionLists
    })
  }
  
  // 获取一级/二级分类列表，并显示
  getCategorys = async (parentId) => {
    const result =  await reqCategorys(parentId)
    if(result.status === 0){
      const categorys = result.data
      if(parentId === '0'){
        this.initOptions(categorys)
      }else{
        return categorys // 返回二级列表
      }
      return 1
    }
  }
  
  formRef = React.createRef()

  onFinish = (values) => {
    this.formRef.current.validateFields().then(()=>{
      console.log(values);
    }).catch()
  }

  // 验证价格的自定义验证
  validatePrice = (rule,value,callback) => {
    if(value*1>0){
      callback() // 验证通过
    }else{
      callback('价格必须大于0')
    }
  }

  componentDidMount(){
    this.getCategorys('0')
  }

  render() {

    const products = this.props.location.state // 如果是添加就没有值
    // console.log(product.name);
    // 保存是否是更新的标识
    this.isUpdate = !!products
    this.product = products || {}

    const {isUpdate,product} = this

    // 用来接收级联分类ID的数组
    const categoryIds = []
    if(isUpdate){
      const {pCategoryId,categoryId} = product
      if(pCategoryId === '0'){
        categoryIds.push(categoryId)
      }else{
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }

    const loadData = async selectedOptions => {
      const targetOption = selectedOptions[0];
      targetOption.loading = true;

      // 根据选中的分类，请求获取二级分类列表
      const subCategorys = await this.getCategorys(targetOption.value)
      targetOption.loading = false
      if(subCategorys && subCategorys.length > 0){
        const childOptions = subCategorys.map(c=>({
          value: c._id,
          label: c.name,
          isLeaf: true
        }))
        // 关联到option上
        targetOption.children = childOptions
      }else{
        // 当前选中的分类没有二级分类
        targetOption.isLeaf = true
      }
      
      this.setState({
        optionLists: [...this.state.optionLists]
      })
    };
    
    const title = (
      <span>
        <a onClick={()=>this.props.history.goBack()}>
          <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20}} onClick={()=>this.props.history.goBack()} />
        </a>
        <span style={{fontSize:20}}>添加商品</span>
      </span>
    )

    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 8}
    }
    
    return (
      <Card title={title}>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          ref={this.formRef}
          onFinish={this.onFinish}
          {...formItemLayout}
        >
          <Form.Item
            label='商品名称'
            name='name'
            initialValue= {product.name}
            rules={[
              {
                required: true, message: '必须输入商品名称'
              }
            ]}
          >
            <Input placeholder='请输入商品名称' />
          </Form.Item>
          <Form.Item
            label='商品描述'
            name='desc'
            initialValue={product.desc}
            rules={[
              {
                required: true, message: '必须输入商品描述'
              }
            ]}
          >
            <TextArea placeholder="请输入商品描述" autoSize={{minRows: 2, maxRows: 6}} />
          </Form.Item>
          <Form.Item
            label='商品价格'
            name='price'
            initialValue={product.price}
            rules={[
              {required: true, message: '必须输入商品价格'},
              {validator: this.validatePrice}
            ]}
          >
            <Input placeholder='请输入商品价格' type="number" addonAfter='元'/>
          </Form.Item>
          <Form.Item
            label='商品分类'
            name='categoryIds'
            initialValue= {categoryIds}
            rules={[
              {required: true, message: '必须输入商品分类'}
            ]}
          >
              <Cascader
                options={this.state.optionLists}
                loadData={loadData} 
              />
          </Form.Item>
          <Form.Item label='商品图片'>
              <div>商品图片</div>
          </Form.Item>
          <Form.Item label='商品详情'>
              <div>商品详情</div>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
