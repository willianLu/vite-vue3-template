import { defineStore } from 'pinia'
import { PageAliveAction } from '@/types'
import { RouteLocationNormalized } from 'vue-router'

export default defineStore('pageAlive', {
  state: (): {
    current?: RouteLocationNormalized
    names: string[]
    action?: PageAliveAction
  } => {
    return {
      names: []
    }
  },
  actions: {
    setPageAlive(current: RouteLocationNormalized, names: string[]) {
      this.current = current
      this.names = names
      console.log([...names], '===========缓存的名称')
    },
    setAction(action?: PageAliveAction) {
      this.action = action
    }
  }
})
