// Vue
import { defineComponent } from 'vue'

// Common
import { RouterView } from 'vue-router'

// Components
import { ConfigProvider } from 'vant'

export default defineComponent({
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
