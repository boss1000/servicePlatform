import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutesUser = [{
  path: '/',
  component: Layout,
  redirect: '/jurisdiction', // 需要按照权限跳转
  meta: {
    title: '核心服务',
    icon: 'dashboard'
  },
  children: [{
    path: 'jurisdiction',
    name: 'jurisdiction',
    component: () => import('@/views/jurisdiction/index'), // 权限管理
    level: "maximum", // 超级管理员权限
    meta: {
      title: '权限配置',
      noCache: false
    }
  },
  {
    path: 'noticemanage',
    name: 'noticemanage',
    component: () => import('@/views/noticemanage/index'), // 消息公告
    level: "maximum",
    meta: {
      title: '消息公告',
      noCache: false
    }
  },
  {
    path: 'studentmanage',
    name: 'studentmanage',
    component: () => import('@/views/studentmanage/index'), // 学生管理
    level: "second", // 总负责人
    meta: {
      title: '学生管理',
      noCache: false
    }
  },
  {
    path: 'approvalmanage',
    name: 'approvalmanage',
    component: () => import('@/views/approvalmanage/index'), // 审批管理
    level: "second", // 总负责人
    meta: {
      title: '审批管理',
      noCache: false
    }
  },
  {
    path: 'statexhibition',
    name: 'statexhibition',
    component: () => import('@/views/statexhibition/index'), // 状态展示
    level: "second", // 总负责人
    meta: {
      title: '状态展示',
      noCache: false
    }
  },
  {
    path: 'approvaler',
    name: 'approvaler',
    component: () => import('@/views/approvaler/index'), // 审批管理
    level: "three", // 审批人员
    meta: {
      title: '审批管理',
      noCache: false
    }
  },
  {
    path: 'stateshow',
    name: 'stateshow',
    component: () => import('@/views/stateshow/index'), // 状态展示
    level: "three", // 审批人员
    meta: {
      title: '状态展示',
      noCache: false
    }
  }]
},
// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router