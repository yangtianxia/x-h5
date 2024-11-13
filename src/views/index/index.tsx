// Vue
import { defineComponent } from 'vue'

// Components
import { App } from '@/components/app'

// Style
import style from './index.module.less'

const [name] = BEM('index', style)

export default defineComponent({
  name,
  setup() {
    return () => (
      <App>
        <App.Body></App.Body>
      </App>
    )
  }
})
