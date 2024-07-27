import layout from '@/layout/index.vue'
import main from '@/views/main.vue'

import { accountRouters } from './account'
import { systemRouters } from './system'

export const defaultRouters = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/analysis',
    key: 'dashboard',
    meta: {
      key: 'dashboard',
      // title: 'Dashboard',
      requiresAuth: true,
      icon: 'ant-design:dashboard-outlined'
    },
    component: main,
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        key: 'dashboard:analysis',
        meta: {
          key: 'dashboard:analysis',
          // title: '分析页',
          requiresAuth: true, // 是否授权
          keepAlive: true // 是否缓存
        },
        component: () => import('@/views/analysis/index.vue')
      }
    ]
  }
]
export const loginRouter = {
  path: '/login',
  name: 'login',
  key: 'login',
  meta: {
    key: 'login',
    // title: '登录',
    notMenu: true
  },
  component: () => import('@/views/login/index.vue')
}
export const noFound = {
  path: '/:pathMatch(.*)',
  redirect: '/dashboard/analysis',
  name: 'error',
  key: 'error',
  meta: {
    key: 'error',
    title: '404',
    notMenu: true
  }
}
export const layoutRouter = [
  {
    path: '/',
    alias: ['/home', '/index'],
    name: 'root',
    key: 'root',
    redirect: '/dashboard/analysis',
    component: layout,
    meta: {
      key: 'root',
      // title: '春秋阁管理后台-成语管理',
      requiresAuth: true
    },
    children: [loginRouter, noFound, ...accountRouters, ...defaultRouters, ...systemRouters]
  }
]
export const routers = [...layoutRouter]
