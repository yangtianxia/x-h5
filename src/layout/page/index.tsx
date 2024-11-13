// Vue
import {
  defineComponent,
  Transition,
  KeepAlive
} from 'vue'

// Common
import { RouterView, type RouteLocationNormalized } from 'vue-router'

// Style
import style from './index.module.less'

interface RouterViewSlot  {
  Component: any
  route: RouteLocationNormalized
}

const [name, bem] = BEM('page', style)

export default defineComponent({
  name,
  setup() {
    return () => (
      <div class={bem()}>
        <RouterView
          v-slots={{
            default: ({ Component, route }: RouterViewSlot) => (
              <Transition
                appear
                name="fade"
                mode="out-in"
              >
                {route.meta.ignoreCache ? <Component key={route.fullPath} /> : (
                  <KeepAlive>
                    <Component key={route.fullPath} />
                  </KeepAlive>
                )}
              </Transition>
            )
          }}
        />
      </div>
    )
  }
})
