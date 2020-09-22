import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/user_control',
    children: [
      // 用户管理
      {
        path: '/user_control',
        name: 'user',
        component: () => import('@/views/elm/users/User'),
        meta: {
          title: '用户管理',
          icon: 'user'
        }
      },
      // 订单管理
      {
        path: '/order_control',
        name: 'order',
        component: () => import('@/views/elm/order/Order'),
        meta: {
          title: '订单管理',
          icon: 'unordered-list'
        }
      },
      // 商家管理
      {
        path: '/business_control',
        name: 'business',
        component: PageView,
        redirect: '/business_control/list',
        meta: {
          title: '商家管理',
          icon: 'appstore'
        },
        children: [{
          path: '/business_control/list',
          name: 'business_list',
          component: () => import('@/views/elm/business/Business'),
          meta: {
            title: '商家列表',
            icon: 'money-collect'
          }
        }, {
          path: '/business_control/type_list',
          name: 'business_type_list',
          component: () => import('@/views/elm/business/Business'),
          meta: {
            title: '商家分类',
            icon: 'money-collect'
          }
        }]
      },
      // 账目管理
      {
        path: '/account_control',
        name: 'account',
        component: () => import('@/views/elm/business/Business'),
        meta: {
          title: '账目管理',
          icon: 'money-collect'
        }
      },
      // 结果页
      {
        path: '/result',
        name: 'result',
        hidden: true,
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o' },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import('@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import('@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true }
          }
        ]
      },

      // 异常页
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        hidden: true,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning' },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500' }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/user',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/dashboard/TestWork')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
