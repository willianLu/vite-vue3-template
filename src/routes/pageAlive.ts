import { RouteLocationNormalized } from 'vue-router'
import usePageAliveStore from '@/store/pageAlive'
import { PageAliveRoute } from '@/types'

// 处理页面缓存
export function handlePageAlive(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  const pageAliveStore = usePageAliveStore()
  const { action, names } = pageAliveStore
  let { current, routes = [] } = pageAliveStore.getPageAlive()
  // 相同路由之间跳转，且存在from.href（即来自真实的路由跳转），且不是通过router.go的形式跳转的
  if (
    to.fullPath === from.fullPath &&
    (from as any).href &&
    (!action || action.type !== 'go')
  ) {
    return
  }
  // 路由历史状态，vue-router提供的数据
  const historyState = history.state
  const preCurrent = current
  // 查找缓存中是否包含当前路由的name
  const index = to.name ? names.findIndex(item => item === to.name) : -1
  console.group('===========路由堆栈处理===========')
  console.log('[ preCurrent ]', preCurrent)
  console.log('[ action ]', action)
  console.groupEnd()
  // 设置当前的路由信息
  current = {
    fullPath: to.fullPath,
    href: (to as any).href,
    name: to.name as string,
    position: historyState.position
  }
  if (action) {
    switch (action.type) {
      case 'push':
      case 'replace':
      case 'forward':
        if (action.type === 'push' || action.type === 'replace') {
          routes = routes.slice(0, current.position)
          routes.push(current)
        }
        // 若是替换的页面已缓存，则移除缓存
        if (action.type === 'replace') {
          removeHadName(from.name as string, names)
        }
        // 当前路由堆栈前若无相同的路由则不缓存
        if (to.name && index === -1 && !isHasSameByBefore(current, routes)) {
          names.push(to.name as string)
        } else if (index > -1) {
          names.splice(index, 1)
        }
        break
      case 'back':
        removeHadName(from.name as string, names)
        if (to.name && index === -1 && !isHasSameByBefore(current, routes)) {
          names.push(to.name as string)
        }
        break
      case 'go':
        // 向前走向
        if (action.delta && action.delta > 0 && index > -1) {
          names.splice(index, 1)
        } else if (action.delta && action.delta < 0) {
          // 向后走向
          for (
            let i = current.position + 1;
            i <= current.position - action.delta;
            i++
          ) {
            routes[i] && removeHadName((<PageAliveRoute>routes[i]).name, names)
          }
        }
        // 必须放在上述处理后面，防止回退多个路由且中间包含当前路由，造成缓存路由被删除
        if (to.name && index === -1 && !isHasSameByBefore(current, routes)) {
          names.push(to.name as string)
        }
        break
    }
  } else if ((from as any).href) {
    let isBack = preCurrent && current.position < preCurrent.position
    if (preCurrent && preCurrent.position === current.position) {
      if (preCurrent.fullPath === current.fullPath) {
        // 此为当前页面刷新
      } else {
        current.position = history.state.position = history.length - 1
        history.state.back = preCurrent.fullPath
        history.state.forward = null
        isBack = false
        routes = routes.slice(0, current.position)
        routes.push(current)
      }
    }
    console.group('===========浏览器菜单栏操作===========')
    console.log('[ 前进 ]', !isBack)
    console.log('[ 返回 ]', isBack)
    console.groupEnd()
    if (isBack) {
      removeHadName(from.name as string, names)
    } else {
      if (index > -1) {
        names.splice(index, 1)
      }
    }
    if (to.name && index === -1 && !isHasSameByBefore(current, routes)) {
      names.push(to.name as string)
    }
  } else {
    if (!preCurrent) {
      // 没有缓存路由，说明第一次访问站点
      for (let i = 0; i < history.length - 1; i++) {
        routes.push(undefined)
      }
      routes.push(current)
    } else if (
      preCurrent.fullPath === current.fullPath &&
      preCurrent.position === current.position
    ) {
      // 条件：依然进入当前页面
      // 场景：1.页面刷新 2.由其他站点前进到当前页面 3.由其他站点返回到当前页面
      if (history.length !== routes.length) {
        routes = routes.slice(0, preCurrent.position + 1)
        for (let i = preCurrent.position + 1; i < history.length; i++) {
          routes.push(undefined)
        }
      }
    } else if (history.length === current.position + 1) {
      let endIndex = current.position
      // 前进方向
      if (preCurrent.position < current.position) {
        endIndex =
          preCurrent.position + 1 < current.position
            ? preCurrent.position + 1
            : preCurrent.position
      }
      routes = routes.slice(0, endIndex)
      for (let i = routes.length; i < current.position; i++) {
        routes.push(undefined)
      }
      routes.push(current)
    }
    if (to.name && index === -1 && !isHasSameByBefore(current, routes)) {
      names.push(to.name as string)
    }
  }
  pageAliveStore.setPageAlive(current, names, routes)
}
// 当前路由前面的路由堆栈是否存在相同的路由
function isHasSameByBefore(
  current: PageAliveRoute,
  routes: Array<PageAliveRoute | undefined>
) {
  for (let i = current.position - 1; i >= 0; i--) {
    const route = routes[i]
    // 若route不存在，代表当前路由堆栈由其他站点跳转过来，前面的路由无需对比
    if (!route) {
      return false
    } else if (current.name === route.name) {
      return true
    }
  }
  return false
}
// 若name已存在，则移除
function removeHadName(name: string, names: string[]) {
  if (!name) return
  const index = names.findIndex(item => item === name)
  if (index > -1) {
    names.splice(index, 1)
  }
}
