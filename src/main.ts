import { createApp } from 'vue'
import router from './routes'
import '@/assets/css/index.less'
import App from './App.vue'
import Config from '@/config'
console.log(Config, '=====配置=====')
import Env from '@/env'
console.log(Env, '=====配置=====')
// 开发环境动态引入mock
// if (import.meta.env.MODE === 'development') {
//   import('../mock/index')
// }

const app = createApp(App)
app.use(router)
app.mount('#app')
