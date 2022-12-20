import { createApp } from 'vue'
import router from './routes'
import '@/assets/css/index.less'
import App from './App.vue'

// 开发环境动态引入mock
if (import.meta.env.MODE === 'development') {
  import('../mock/index')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
