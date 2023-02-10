import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/my',
    name: 'MyPage',
    component: () => import('@/views/My.vue')
  },
  {
    path: '/normal-h5',
    name: 'NormalH5Page',
    component: () => import('@/views/NormalH5.vue'),
    beforeEnter: () => {
      console.log('===路由独享守卫===')
    }
  },
  {
    path: '/special-h5',
    name: 'SpecialH5Page',
    component: () => import('@/views/SpecialH5.vue')
  },
  {
    path: '/page-a',
    name: 'APage',
    component: () => import('@/views/PageA.vue')
  },
  {
    path: '/page-b',
    name: 'BPage',
    component: () => import('@/views/PageB.vue')
  },
  {
    path: '/page-c',
    name: 'CPage',
    component: () => import('@/views/PageC.vue')
  },
  {
    path: '/detail',
    name: 'DetailPage',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/order-detail/:id',
    name: 'OrderDetailPage',
    component: () => import('@/views/OrderDetail.vue')
  }
]
if (import.meta.env.MODE === 'development') {
  routes.push({
    path: '/icons',
    component: () => import('@/views/Icon.vue')
  })
}

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
})

export default router
