import { reactive } from 'vue'
import { useChildren } from '@vant/use'
import { isString } from '@txjs/bool'
import type { ResultOptions, ResultStatus } from '@/components/result'
import { createInjectionKey } from '@/components/_utils/basic'

interface AppContextOption {
  loading?: boolean
  status?: ResultStatus
}

export interface AppContextProvide {
  state: {
    loading: boolean
    status?: ResultStatus
  }
}

export const APP_CONTEXT_KEY = createInjectionKey<AppContextProvide>('app-context')

export const useAppContext = (options?: AppContextOption) => {
  const { linkChildren } = useChildren(APP_CONTEXT_KEY)

  const state = reactive({
    loading: options?.loading ?? true,
    status: options?.status
  })

  const reload = (error: any, callback?: UnknownCallback) => {
    if (error.code === 401) return

    const result = { status: error } as ResultOptions
    const errMsg = error.message || error.errMsg || error.msg

    if (isString(error)) {
      result.desc = error
    } else if (errMsg) {
      result.desc = errMsg
    }

    if (callback) {
      result.refresh = () => {
        state.loading = true
        state.status = void 0
        callback?.()
      }
    }

    state.status = result
  }

  linkChildren({ state })

  return {
    reload,
    hideLoading() {
      state.loading = false
    },
    showLoading() {
      state.loading = true
    },
    resetStatus() {
      state.status = undefined
    },
    set loading(value: boolean) {
      state.loading = value
    },
    get loading() {
      return state.loading
    },
    set status(value: ResultStatus | undefined) {
      state.status = value
    },
    get status() {
      return state.status
    }
  }
}
