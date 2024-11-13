import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 如果设置为true，则需要底部栏 */
    tabbar?: boolean
    /** 是否需要登录才能访问当前页面（每个路由必须声明） */
    requiresAuth: boolean
    /** 登录授权后禁止访问 */
    authNoAccessAfter?: boolean
    /** 在窗口栏显示名称 */
    title?: string
    /** 如果设置为true，页面将不会被缓存 */
    ignoreCache?: boolean
  }
}
