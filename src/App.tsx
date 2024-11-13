// Vue
import { defineComponent } from 'vue'

// Common
import { RouterView } from 'vue-router'

// Components
import { ConfigProvider } from 'vant'

const [name] = BEM('app')

export default defineComponent({
  name,
  setup() {
    return () => (
      <ConfigProvider
        tag="main"
        themeVars={themeVars}
        themeVarsScope="global"
      >
        <RouterView />
      </ConfigProvider>
    )
  }
})
