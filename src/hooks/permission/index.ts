import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { isLogin } from '@/shared/auth'

export const usePermission = () => {
  return {
    accessRightsAfterAuth(route: RouteLocationNormalized | RouteRecordRaw) {
      return isLogin() ? route.meta?.authNoAccessAfter !== true : true
    },
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      const canAccess = !route.meta?.requiresAuth
      return this.accessRightsAfterAuth(route) && canAccess
    }
  }
}
