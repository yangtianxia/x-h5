import type { RouteRecordRaw } from 'vue-router'
import { NOT_FOUND_ROUTE_NAME } from '../constant'

export const DEFAULT_LAYOUT = () => import('@/layout')

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  component: () => import('@/views/not-found')
}
