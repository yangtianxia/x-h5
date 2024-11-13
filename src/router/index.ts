import { createRouter, createWebHistory } from 'vue-router'

import createRouteGuard from './guard'
import appRoutes from './routes'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL
  ),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [...appRoutes]
})

createRouteGuard(router)

export default router
