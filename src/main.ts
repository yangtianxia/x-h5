import '@/global.less'

import { createApp } from 'vue'
import dayjs from 'dayjs'
import app from './App'
import router from '@/router'
import store from '@/store'
import { setToastDefaultOptions } from 'vant'

// BEM配置
BEM.config({
  mode: import.meta.env.DEV ? 'always' : 'match',
  prefix: import.meta.env.VITE_PREFIX
})

// dayjs语言配置
dayjs.locale('zh-cn')

// toast配置
setToastDefaultOptions({
  forbidClick: true
})

createApp(app)
  .use(router)
  .use(store)
  .mount('#app')
