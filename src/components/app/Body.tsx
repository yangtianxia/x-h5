// Vue
import {
  defineComponent,
  inject,
  type ExtractPropTypes
} from 'vue'

// Components
import { APP_KEY } from './App'
import { Result } from '../result'

// Component utils
import { isNil, notNil } from '@txjs/bool'

const [name, bem] = BEM('body')

const bodyProps = {
  shrink: Boolean
}

export type BodyProps = ExtractPropTypes<typeof bodyProps>

export default defineComponent({
  name,
  props: bodyProps,
  setup(props, { slots }) {
    const app = inject(APP_KEY)

    if (isNil(app)) {
      throw new Error('Body必须是App的字组件')
    }

    const { status } = app

    return () => {
      const { shrink } = props
      const empty = notNil(status.value)
      return (
        <div class={bem({ empty, shrink })}>
          {empty ? <Result status={status.value} /> : slots.default?.()}
        </div>
      )
    }
  }
})
