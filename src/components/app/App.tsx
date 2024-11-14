// Vue
import {
  defineComponent,
  computed,
  provide,
  type ComputedRef,
  type ExtractPropTypes
} from 'vue'

// Common
import { shallowMerge } from '@txjs/shared'
import { useParent } from '@vant/use'
import { APP_CONTEXT_KEY } from '@/hooks/app-context'

// Component
import Loading from '../loading'
import { resultSharedProps, type ResultStatus } from '../result'

// Component utils
import { truthProp } from '../_utils/props'
import { createInjectionKey } from '../_utils/basic'
import { preventDefault } from '../_utils/event'
import { APP_LOADING_KEY } from './AppContext'

const [name, bem] = BEM('app')

const appProps = shallowMerge({}, resultSharedProps, {
  loading: truthProp
})

export type AppProps = ExtractPropTypes<typeof appProps>

export type AppProvide = {
  readonly loading: ComputedRef<boolean>
  readonly status: ComputedRef<ResultStatus>
}

export const APP_KEY = createInjectionKey<AppProvide>(name)

export default defineComponent({
  name,
  props: appProps,
  setup(props, { slots }) {
    const { parent: appContext } = useParent(APP_CONTEXT_KEY)

    const loading = computed(() =>
      appContext?.state.loading ?? props.loading
    )
    const status = computed(() =>
      appContext?.state.status ?? props.status
    )

    const onLoadingTouchmove = (evt: TouchEvent) => {
      preventDefault(evt, true)
    }

    provide(APP_LOADING_KEY, () => loading.value)
    provide(APP_KEY, { loading, status })

    return () => (
      <view class={bem()}>
        <div
          v-show={loading.value}
          class={bem('loading')}
          onTouchmove={onLoadingTouchmove}
        >
          <div class={bem('loading-inner', { custom: !!slots.loading })}>
            {slots.loading?.() || <Loading size={26} />}
          </div>
        </div>
        {slots.default?.()}
      </view>
    )
  }
})
