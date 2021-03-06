const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home',  // 对应的path
    icon: 'Home',  // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/products',
    icon: 'Appstore',
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: 'Bars'
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'Tool'
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'User'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'Safety'
  },
  {
    title: '图形图表',
    key: '/charts',
    icon: 'AreaChart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'BarChart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'LineChart'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'PieChart'
      }
    ]
  },
]

export default menuList