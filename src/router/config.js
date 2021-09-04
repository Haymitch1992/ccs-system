import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/perception',
      children: [
        {
          path: 'perception',
          name: '感知管理',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/perception')
        },
        {
          path: 'initiative',
          name: '自主引导管理',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/initiative/initiative')
        },
        {
          path: 'equipment',
          name: '集约化装备管理',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo')
        },
        {
          path: 'consensus',
          name: '舆情分析管理',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo')
        },
        {
          path: 'log',
          name: '日志查看',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo')
        },
        {
          path: 'staff',
          name: '员工管理',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo')
        },
         {
          path: 'historyData',
          name: '历史数据统计',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo')
        }
      ]
    }
  ]
}

export default options
