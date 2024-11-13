import type { RouteRecordNormalized } from 'vue-router'
import { isNil, isArray } from '@txjs/bool'

const modules = import.meta.glob('./modules/*.ts', {
  eager: true
})

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object
    .keys(_modules)
    .forEach((key) => {
      const defaultModule = _modules[key].default
      if (isNil(defaultModule)) return

      const moduleList = isArray(defaultModule)
        ? [...defaultModule]
        : [defaultModule]
      result.push(...moduleList)
    })
  return result
}

const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

export default appRoutes
