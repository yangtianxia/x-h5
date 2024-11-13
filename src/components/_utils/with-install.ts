import type { App, Component } from 'vue'
import extend from 'extend'
import { camelize } from '@txjs/shared'

interface CustomShim<T> {
  new (...args: any[]): {
    $props: T
  }
}

type EventShim = CustomShim<{
  onClick?: (event: Event) => void
}>

export type WithInstall<T, U> = T & U & EventShim & {
  install(app: App): void
}

export const withInstall = <T extends Component, U extends object>(options: T, additional?: U) => {
  extend(options, additional);

  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options

    if (name) {
      app.component(name, options)
      app.component(camelize(name), options)
    }
  }

  return options as WithInstall<T, Readonly<U>>
}
