// Vue
import {
  defineComponent,
  reactive,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Common
import { useCountDown } from '@vant/use'
import {
  omit,
  shallowMerge,
  callInterceptor,
  type Interceptor
} from '@txjs/shared'

// Components
import {
  Button,
  buttonProps,
  type ButtonProps
} from 'vant'

// Component utils
import { createVNode } from '../_utils/basic'
import {
  VNodeProp,
  makeNumberProp,
  makeStringProp
} from '../_utils/props'

const [name, bem] = BEM('count-down')

const countDownProps = shallowMerge({}, buttonProps, {
  interval: makeNumberProp(60),
  size: makeStringProp<ButtonProps['size']>('mini'),
  beforeText: makeStringProp('[S] 秒后重发'),
  text: {
    type: VNodeProp,
    default: '获取验证码'
  },
  afterText: {
    type: VNodeProp,
    default: '重新获取'
  },
  beforeChange: Function as PropType<Interceptor>
})

const countDownPropsKeys = [
  'interval',
  'beforeText',
  'text',
  'afterText',
  'beforeChange',
  'finish'
] as const

export type CountDownProps = ExtractPropTypes<typeof countDownProps>

export default defineComponent({
  name,
  props: countDownProps,
  setup(props, { slots }) {
    const state = reactive({
      interval: props.interval,
      disabled: false,
      loading: false,
      finish: false
    })

    const { start, reset } = useCountDown({
      time: state.interval * 1000,
      onChange: ({ total }) => {
        state.interval = Math.floor(total / 1000)
      },
      onFinish: () => {
        state.disabled = false
        state.finish = true
        state.interval = props.interval
        reset()
      }
    })

    const formatText = (value: string) => {
      return value.replace(/^\[S\](.*)?$/g, `${state.interval}$1`)
    }

    const onTap = () => {
      state.loading = true
      callInterceptor(props.beforeChange, {
        done: () => {
          state.disabled = true
          state.finish = false
          state.loading = false
          start()
        },
        canceled: () => {
          state.loading = false
        }
      })
    }

    const renderText = () => {
      const text = state.disabled
        ? formatText(props.beforeText)
        : state.finish
          ? props.afterText
          : slots.default || props.text
      return createVNode(text)
    }

    return () => (
      <Button
        {...omit(shallowMerge({}, props, state), countDownPropsKeys)}
        class={bem()}
        onClick={onTap}
      >
        {renderText()}
      </Button>
    )
  }
})
