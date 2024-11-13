// Vue
import {
  defineComponent,
  ref,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Common
import { useParent } from '@vant/use'
import { shallowMerge, omit } from '@txjs/shared'
import { useExpose } from '@/hooks/expose'

// Components
import {
  Field,
  fieldProps,
  type FieldInstance
} from 'vant'
import { FORM_KEY } from './Form'

const [name] = BEM('field')

const xFieldProps = shallowMerge({}, fieldProps, {
  onFocus: Function as PropType<(evt: Event) => void>,
  onBlur: Function as PropType<(evt: Event) => void>,
  onClear: Function as PropType<(evt: MouseEvent) => void>,
  onClick: Function as PropType<(evt: MouseEvent) => void>,
  onClickInput: Function as PropType<(evt: MouseEvent) => void>,
  onClickLeftIcon: Function as PropType<(evt: MouseEvent) => void>,
  onClickRightIcon: Function as PropType<(evt: MouseEvent) => void>,
  onStartValidate: Function as PropType<(...args: any[]) => void>,
  onEndValidate: Function as PropType<(evt: {
    status: string
    message: string
  }) => void>,
  'onUpdate:modelValue': Function as PropType<(value: unknown) => void>
})

export type FieldProps = ExtractPropTypes<typeof xFieldProps>

export default defineComponent({
  name,
  props: xFieldProps,
  setup(props, { slots }) {
    const { parent: form } = useParent(FORM_KEY)
    const root = ref<FieldInstance>()

    const getRules = () => {
      let { name, rules = [] } = props

      if (name && form && form.props.rules?.[name]) {
        rules = rules.concat(form.props.rules[name])
      }

      return rules
    }

    const focus = () => root.value?.focus()

    const blur = () => root.value?.blur()

    useExpose({ focus, blur })

    return () => (
      <Field
        ref={root}
        {...omit(props, ['rules'])}
        rules={getRules()}
        v-slots={slots}
      />
    )
  }
})
