import '@/global.less'

import { createApp } from 'vue'
import dayjs from 'dayjs'
import app from './App'
import router from '@/router'
import store from '@/store'
import '@/mock'

// BEM配置
BEM.config({
  mode: import.meta.env.DEV ? 'always' : 'match',
  prefix: import.meta.env.VITE_PREFIX
})

// dayjs语言配置
dayjs.locale('zh-cn')

createApp(app)
  .use(router)
  .use(store)
  .mount('#app')
