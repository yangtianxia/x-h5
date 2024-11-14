import type { Router, LocationQueryRaw } from 'vue-router'
import { showDialog } from 'vant'
import { useUserStore } from '@/store'
import { isLogin } from '@/shared/auth'
import { REDIRECT_URI } from '@/shared/constant'
import { LOGIN_ROUTE_NAME } from '../constant'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, form, next) => {
    const userStore = useUserStore()
    if (isLogin()) {
      if (userStore.id) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          next()
        } catch (error: any) {
          if (error?.code === 401) {
            userStore.logoutCallback()
            next({
              name: LOGIN_ROUTE_NAME,
              query: {
                [REDIRECT_URI]: to.fullPath
              } as LocationQueryRaw
            })
          } else {
            showDialog({
              title: '获取用户失败',
              message: `${error.message || error.msg}`,
              confirmButtonText: '重试'
            })
            .then(() => {
              window.location.reload()
            })
            next()
          }
        }
      }
    } else if (to.meta.requiresAuth) {
      if (to.name === LOGIN_ROUTE_NAME) {
        next()
        return
      }
      next({
        name: LOGIN_ROUTE_NAME,
        query: {
          [REDIRECT_URI]: to.fullPath
        } as LocationQueryRaw
      })
    } else {
      next()
    }
  })
}
