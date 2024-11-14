import type { Router } from 'vue-router'
import { usePermission } from '@/hooks/permission'
import appRoutes from '../routes'
import { NOT_FOUND_ROUTE } from '../constant'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const Permission = usePermission()
    const permissionsAllow = Permission.accessRightsAfterAuth(to)

    if (permissionsAllow) {
      next()
    } else {
      const destination = Permission.findFirstPermissionRoute(appRoutes) || NOT_FOUND_ROUTE
      next(destination)
    }
  })
}
