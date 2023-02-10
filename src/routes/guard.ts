import router from './router'
import { handlePageAlive } from './pageAlive'

router.afterEach((to, from) => {
  console.group('===========afterEach===========')
  console.log('[ to ]', to)
  console.log('[ from ]', from)
  console.log('[ history ]', history)
  console.groupEnd()
  // 处理页面缓存
  handlePageAlive(to, from)
})
