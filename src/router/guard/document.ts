import type { Router } from 'vue-router'
import { isValidString } from '@txjs/bool'

const bodyEl = document.body ?? document.getElementsByName('body')[0]

const setTitle = (...args: string[]) => {
  document.title = [...args, import.meta.env.VITE_TITLE].filter(isValidString).join(' - ')
}

export default function setupDocumentGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const toName = to.name as string
    const fromName = from.name as string
    const redirectedFromName = to?.redirectedFrom?.name as string
    if (toName) {
      bodyEl.classList.add(toName)
    }
    if (fromName && fromName !== toName) {
      bodyEl.classList.remove(fromName)
    }
    if (redirectedFromName) {
      bodyEl.classList.remove(redirectedFromName)
    }
    const titleList = to.matched
      .map((route) => route.meta.title)
      .filter(isValidString)
    setTitle(...titleList.reverse())
    next()
  })
}
