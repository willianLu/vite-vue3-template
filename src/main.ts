import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import '@/assets/css/index.less'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import App from './App.vue'
import Env from '@/env'
import Config from '@/config'
console.log(Env, '=====环境=====')
console.log(Config, '======配置=====')
// 开发环境动态引入mock
if (import.meta.env.MODE === 'development') {
  import('../mock/index')
}

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
