import type { RouteLocationNormalized } from 'vue-router'
import mitt, { type Handler } from 'mitt'

const emitter = mitt()

const key = Symbol('ROUTE_CHANGE')

let lastedRoute: RouteLocationNormalized

export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to)
  lastedRoute = to
}

export function listenerRouteChange(
  handler: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && lastedRoute) {
    handler(lastedRoute)
  }
}

export function removeRouteListener() {
  emitter.off(key)
}
