import type { RouteRecordRaw } from 'vue-router'
import { DEFAULT_LAYOUT, NOT_FOUND_ROUTE } from '../base'
import { DEFAULT_ROUTE_NAME, LOGIN_ROUTE_NAME } from '../../constant'

const COMMON: RouteRecordRaw = {
  path: '/index',
  name: 'CommonLayout',
  component: DEFAULT_LAYOUT,
  redirect: '/',
  meta: {
    requiresAuth: false
  },
  children: [
    {
      path: '/',
      name: DEFAULT_ROUTE_NAME,
      component: () => import('@/views/index'),
      meta: {
        title: '首页',
        requiresAuth: false,
        tabbar: true
      }
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/views/my'),
      meta: {
        title: '我的',
        requiresAuth: true,
        tabbar: true
      }
    },
    {
      path: '/login',
      name: LOGIN_ROUTE_NAME,
      component: () => import('@/views/login'),
      meta: {
        title: '登录',
        requiresAuth: false,
        authNoAccessAfter: true
      }
    },
    NOT_FOUND_ROUTE
  ]
}

export default COMMON
