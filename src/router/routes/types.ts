import type { RouteMeta, NavigationGuard } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw {
  path: string
  name?: string | symbol
  meta?: RouteMeta
  redirect?: string
  component: Component | string
  children?: AppRouteRecordRaw[]
  alias?: string | string[]
  props?: Record<string, any>
  fullPath?: string
  beforeEnter?: NavigationGuard | NavigationGuard[]
}
