// Types
import type { Rule } from '@txjs/vant-validator'

// Vue
import {
  defineComponent,
  ref,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Common
import { shallowMerge, omit } from '@txjs/shared'
import { useChildren } from '@vant/use'
import { useExpose } from '@/hooks/expose'

// Components
import {
  Form,
  formProps,
  type FormInstance,
  type FieldRule
} from 'vant'
import type { FormExpose } from 'vant/es/form/types'

// Component utils
import { createInjectionKey } from '../_utils/basic'
import { truthProp } from '../_utils/props'

const [name] = BEM('form')

const xFormProps = shallowMerge({}, formProps, {
  validateFirst: truthProp,
  rules: Object as PropType<Record<string, FieldRule & Rule[]>>,
  onReset: Function as PropType<() => void>,
  onFinish: Function as PropType<(values: Record<string, unknown>) => void>,
  onValidate: Function as PropType<(evt: {
    name: string,
    message: string
  }) => void>,
  onSubmit: Function as PropType<(...args: any) => void>,
  onFailed: Function as PropType<(...args: any) => void>
})

const formPropsKeys = [
  'rules',
  'onReset',
  'onFinish',
  'onValidate'
] as const

export type FormProps = ExtractPropTypes<typeof xFormProps>

export type FormProvide = {
  props: FormProps
} & FormExpose

export const FORM_KEY = createInjectionKey<FormProvide>(name)

export default defineComponent({
  name,
  props: xFormProps,
  setup(props, { slots }) {
    const { linkChildren } = useChildren(FORM_KEY)
    const root = ref<FormInstance>()

    const submit = () => root.value?.submit()

    const getValues = () => root.value?.getValues()!

    const validate = (name?: string | string[]) => root.value?.validate(name)!

    const resetValidation = (name?: string | string[]) => root.value?.resetValidation(name)!

    const getValidationStatus = () => root.value?.getValidationStatus()!

    const scrollToField = (name: string, options?: boolean | ScrollIntoViewOptions) => root.value?.scrollToField(name, options)!

    useExpose({
      submit,
      getValues,
      validate,
      resetValidation,
      getValidationStatus,
      scrollToField
    })

    linkChildren({
      props,
      submit,
      getValues,
      validate,
      resetValidation,
      getValidationStatus,
      scrollToField
    })

    return () => (
      <Form
        ref={root}
        {...omit(props, formPropsKeys)}
        v-slots={slots}
      />
    )
  }
})
