import type { Router } from 'vue-router'
import { isValidString } from '@txjs/bool'

const bodyEl = document.body ?? document.getElementsByName('body')[0]

const updateTitle = (...args: string[]) => {
  document.title = [...args, import.meta.env.VITE_TITLE].filter(isValidString).join(' - ')
}

export default function setupWindowGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const toName = to.name as string | undefined
    const fromName = from.name as string | undefined
    const redirectedFromName = to?.redirectedFrom?.name as string | undefined

    if (toName) {
      bodyEl.classList.add(toName)
    }

    if (fromName && fromName !== toName) {
      bodyEl.classList.remove(fromName)
    }

    if (redirectedFromName) {
      bodyEl.classList.remove(redirectedFromName)
    }

    const titles = to.matched
        .map((route) => route.meta.title)
        .filter(isValidString)
    updateTitle(...titles.reverse())

    next()
  })
}
