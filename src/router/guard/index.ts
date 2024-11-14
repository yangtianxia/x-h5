import type { Router } from 'vue-router'
import { setRouteEmitter } from '@/shared/route-listener'

import setupUserLoginInfoGuard from './userLoginInfo'
import setupDocumentGuard from './document'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
  setupDocumentGuard(router)
}
