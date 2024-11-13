// Vue
import { defineComponent } from 'vue'

// Style
import style from './index.module.less'

const [name, bem] = BEM('login', style)

export default defineComponent({
  name,
  setup() {
    return () => (
      <div class={bem()}></div>
    )
  }
})
