import { RouteLocationNormalized } from 'vue-router'
import router from './router'
import usePageAliveStore from '@/store/pageAlive'

router.afterEach((to, from) => {
  handlePageAlive(to, from)
})

// 设置页面缓存规则
function handlePageAlive(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  const pageAliveStore = usePageAliveStore()
  const { action, names, current } = pageAliveStore
  const index = names.findIndex(item => item === to.name)
  if (to.name && index === -1) {
    names.push(to.name as string)
  }
  let idx = 0
  if (action) {
    switch (action.type) {
      case 'push':
      case 'replace':
      case 'forward':
        if (index > -1) {
          names.splice(index, 1)
        }
        break
      case 'back':
        idx = names.findIndex(item => item === from.name)
        if (idx > -1) {
          names.splice(idx, 1)
        }
        break
      case 'go':
        if (action.delta && action.delta > 0 && index > -1) {
          names.splice(index, 1)
        } else if (action.delta && action.delta < 0) {
          idx = names.findIndex(item => item === from.name)
          if (idx > -1) {
            names.splice(idx, 1)
          }
        }
        break
    }
  } else if (current) {
    const isBack = history.state.forward === from.fullPath
    const isForward = history.state.back === from.fullPath
    if (isBack) {
      idx = names.findIndex(item => item === from.name)
      if (idx > -1) {
        names.splice(idx, 1)
      }
    } else if (isForward && index > -1) {
      names.splice(index, 1)
    }
  }
  pageAliveStore.setPageAlive(to, names)
}
