import { getCurrentInstance } from 'vue'
import { shallowMerge } from '@txjs/shared'

export const useExpose = <T = Record<string, any>>(apis: T) => {
  const vm = getCurrentInstance()

  if (vm) {
    shallowMerge(vm.proxy!, apis)
  }
}
