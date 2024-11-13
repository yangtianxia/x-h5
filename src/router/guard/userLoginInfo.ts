import type { Router, LocationQueryRaw } from 'vue-router'
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
        } catch (err: any) {
          const needReset = err === 'USER_NOT_FOUND' || err?.code === 401

          if (needReset) {
            await userStore.logout()
          }

          if (to.name === LOGIN_ROUTE_NAME || to.name === 'notPermission') {
            next()
            return
          }

          next({
            name: needReset ? LOGIN_ROUTE_NAME : 'notPermission',
            query: {
              [REDIRECT_URI]: to.fullPath
            } as LocationQueryRaw
          })
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
