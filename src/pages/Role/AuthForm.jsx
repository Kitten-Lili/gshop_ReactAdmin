import React, { Component } from 'react'
import {
  Form,
  Input,
  Tree
} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'


export default class AuthForm extends Component {

  // 初始化函数
  constructor(props){
    super(props)
    this.treeNodes = this.getTreeNodes(menuList)
    const {menus} = this.props.role
    // 初始化数据
    this.state = {
      checkedKeys: menus
    }
  }

  static propTypes = {
    role: PropTypes.object
  }

  formRef = React.createRef()
  onFinish = (values) => {
  }

  getTreeNodes = (menuList) =>{
    return menuList.reduce((pre,item)=>{
      pre.push(
        {title:item.title,key:item.key,children: item.children ? this.getTreeNodes(item.children) : null}
      )
      return pre
    },[])
  }

  // 提供给父组件最新的权限信息
  getMenus = () => this.state.checkedKeys

  onCheck = checkedKeys => {
    this.setState({checkedKeys})
  }

  componentDidMount() {
  }

  render() {

    const {checkedKeys} = this.state

    const { role } = this.props

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    const treeData = [
      {
        title: '平台权限',
        key: 'all',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
              {
                title: 'leaf',
                key: '0-0-0-0',
                disableCheckbox: true,
              },
              {
                title: 'leaf',
                key: '0-0-0-1',
              },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [
              {
                title: 'sss',
                key: '0-0-1-0',
              },
            ],
          },
        ],
      },
    ];

    return (
      <div>
        <Form.Item
          name='roleName'
          label='角色名称'
          {...formItemLayout}
          initialValue={role.name}
        >
          <Input disabled />
        </Form.Item>

        <Tree
          checkable
          defaultExpandAll='true'
          treeData={this.treeNodes}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        />
      </div>
    )
  }
}