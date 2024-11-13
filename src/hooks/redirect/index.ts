import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isValidString } from '@txjs/bool'
import { LOGIN_ROUTE_NAME, DEFAULT_ROUTE } from '@/router/constant'
import { REDIRECT_URI, REDIRECT_PARAMS } from '@/shared/constant'

export const useRedirect = () => {
  const { query, fullPath } = useRoute()
  const router = useRouter()

  let redirect_uri = query[REDIRECT_URI] as string

  if (isValidString(redirect_uri)) {
    redirect_uri = decodeURIComponent(redirect_uri)
  }

  const from = reactive({
    [REDIRECT_PARAMS]: redirect_uri
  })

  const go = (target?: string) => {
    router.replace({
      name: LOGIN_ROUTE_NAME,
      query: {
        [REDIRECT_URI]: target ?? fullPath
      }
    })
  }

  const to = (callback?: UnknownCallback) => {
    const redirectURL = from[REDIRECT_PARAMS]

    if (!redirectURL) {
      router.replace(DEFAULT_ROUTE)
    } else if (callback) {
      callback(redirectURL)
    } else {
      router.replace(redirectURL)
    }
  }

  return { from, query, go, to }
}
