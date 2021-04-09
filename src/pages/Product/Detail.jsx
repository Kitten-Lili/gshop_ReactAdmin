import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategory } from '../../api'

export default class ProductDetail extends Component {

  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount(){
    // 得到当前商品的分类ID
    const {pCategoryId, categoryId} = this.props.location.state.product
    if(pCategoryId === '0'){ // 一级分类下的商品
      const result = await reqCategory(pCategoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    }else{ // 二级分类下的商品
      // const result1 = await reqCategory(pCategoryId)
      // const result2 = await reqCategory(categoryId)
      // const cName1 = result1.data.name
      // const cName2 = result2.data.name

      // 一次性发送多个请求，只有都成功了，才正常处理
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }
  }

  render() {

    // 读取携带过来的state数据
    const {name,desc,price,detail,imgs} = this.props.location.state.product
    const {cName1,cName2} = this.state
    
    const title = (
      <div>
        <a>
          <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20}} onClick={()=>this.props.history.goBack()} />
        </a>
        <span style={{fontSize:20}}>商品详情</span>
      </div>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <List.Item>
            <div>
              <span className='left'>商品名称:</span>
              <span>{name}</span>
            </div>
          </List.Item>
          <List.Item>
            <div>
              <span className='left'>商品描述:</span>
              <span>{desc}</span>
            </div>
          </List.Item>
          <List.Item>
            <div>
              <span className='left'>商品价格:</span>
              <span>{price}</span>
            </div>
          </List.Item>
          <List.Item>
            <div>
              <span className='left'>所属分类:</span>
              <span>{cName1} --> {cName2}</span>
            </div>
          </List.Item>
          <List.Item>
            <div>
              <span className='left'>商品图片:</span>
              <span>
                {
                  imgs.map(img=>{
                    <img src={'http://localhost:5000/upload/'+img} alt="img" className="product-img" key={img}/>
                  })
                }
              </span>
            </div>
          </List.Item>
          <List.Item>
            <div>
              <span className='left'>商品详情:</span>
              <span dangerouslySetInnerHTML={{__html: detail}}></span>
            </div>
          </List.Item>
        </List>
      </Card>
    )
  }
}
