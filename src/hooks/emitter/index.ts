import mitt from 'mitt'
import { onUnmounted } from 'vue'

type EventName = string | symbol

const emitter = mitt()

export const useEmitter = () => {
  const eventNames = [] as EventName[]
  const emit = emitter.emit
  const all = emitter.all
  const off = emitter.off
  const on = (eventName: EventName, listener: UnknownCallback<any>) => {
    emitter.on(eventName, listener)
    eventNames.push(eventName)
  }

  onUnmounted(() => {
    for (const key in eventNames) {
      off(key)
    }
  })

  return { emit, all, off, on }
}
