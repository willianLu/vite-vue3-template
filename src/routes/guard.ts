import router from './router'
import { handlePageAlive } from './pageAlive'

router.afterEach((to, from) => {
  // 处理页面缓存
  handlePageAlive(to, from)
})
