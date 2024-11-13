// Vue
import { defineComponent, ref } from 'vue'

// Common
import { listenerRouteChange } from '@/shared/route-listener'

// Components
import LayoutPage from './page'
import LayoutTabbar from './tabbar'

// Style
import style from './index.module.less'

const [name, bem] = BEM('layout', style)

export default defineComponent({
  name,
  setup() {
    /** 是否显示Tabbar */
    const showTabbar = ref<boolean>()

    listenerRouteChange((route) => {
      showTabbar.value = route.meta?.tabbar
    })

    return () => (
      <div class={bem()}>
        <LayoutPage />
        {showTabbar.value ? <LayoutTabbar /> : null}
      </div>
    )
  }
})
