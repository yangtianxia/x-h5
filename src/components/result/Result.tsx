// Vue
import {
  defineComponent,
  reactive,
  watch,
  onMounted,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Common
import { shallowMerge, omit } from '@txjs/shared'
import { isPlainObject, isString } from '@txjs/bool'

// Component utils
import { createVNode } from '../_utils/basic'
import { VNodeProp } from '../_utils/props'
import { resultSharedProps, resultStatusConfig } from './utils'

// Types
import type { VNode } from '../_utils/types'
import type { ResultCode } from './types'

const [name, bem] = BEM('result')

const resultProps = shallowMerge({}, resultSharedProps, {
  image: VNodeProp,
  title: VNodeProp,
  desc: VNodeProp,
  bottom: Function as PropType<VNode>,
  refresh: Function as PropType<UnknownCallback>
})

export type ResultProps = ExtractPropTypes<typeof resultProps>

export default defineComponent({
  name,
  props: resultProps,
  setup(props, { slots }) {
    const option = reactive({
      image: props.image,
      title: props.title,
      bottom: props.bottom,
      desc: props.desc
    })

    const withOption = (status: ResultCode, refresh?: UnknownCallback) => {
      const newConfig = resultStatusConfig[status]

      if (!newConfig) return

      if (refresh && ['error', '500'].includes(status)) {
        option.desc = '别紧张，试试看刷新页面'
      }

      shallowMerge(option, newConfig)
    }

    const updateOption = () => {
      const currentStatus = props.status
      const currentRefresh = props.refresh
      const newOption = omit(props, ['status', 'refresh'])

      shallowMerge(option, newOption)

      if (isPlainObject(currentStatus)) {
        const { status, refresh, ...partial } = currentStatus

        if (isString(status)) {
          withOption(status, refresh || currentRefresh)
        }

        shallowMerge(option, partial)
      } else {
        withOption(currentStatus, currentRefresh)
      }
    }

    watch(
      () => props.status,
      updateOption
    )

    onMounted(updateOption)

    const renderImage = () => {
      const image = createVNode(slots.image || option.image, {
        render: (value) => <img src={value} />
      })

      if (image) {
        return (
          <view class={bem('image')}>
            {image}
          </view>
        )
      }
    }

    const renderTitle = () => {
      const title = createVNode(slots.title || option.title)
      if (title) {
        return (
          <view class={bem('title')}>
            {title}
          </view>
        )
      }
    }

    const renderDesc = () => {
      const desc = createVNode(slots.desc || option.desc)
      if (desc) {
        return (
          <view class={bem('desc')}>
            {desc}
          </view>
        )
      }
    }

    const renderBottom = () => {
      const bottom = createVNode(slots.default || option.bottom)
      if (bottom) {
        return (
          <view class={bem('bottom')}>
            {bottom}
          </view>
        )
      }
    }

    return () => (
      <view class={bem()}>
        {renderImage()}
        {renderTitle()}
        {renderDesc()}
        {renderBottom()}
      </view>
    )
  }
})
