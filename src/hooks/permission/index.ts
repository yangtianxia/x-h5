import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { isLogin } from '@/shared/auth'

export const usePermission = () => {
  return {
    accessRightsAfterAuth(route: RouteLocationNormalized | RouteRecordRaw) {
      return isLogin() ? route.meta?.authNoAccessAfter !== true : true
    },
    findFirstPermissionRoute(_routers: any) {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (!firstElement?.meta?.authNoAccessAfter) {
          return { name: firstElement.name }
        }
        if (firstElement && firstElement?.children) {
          cloneRouters.push(...firstElement!.children)
        }
      }
      return null
    }
  }
}
