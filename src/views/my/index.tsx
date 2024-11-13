// Vue
import { defineComponent } from 'vue'

// Style
import style from './index.module.less'

const [name, bem] = BEM('my', style)

export default defineComponent({
  name,
  setup() {
    return () => (
      <div class={bem()}></div>
    )
  }
})
