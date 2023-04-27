import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/full-screen',
    name: 'FullScreenPage',
    component: () => import('@/views/full-screen/index.vue')
  },
  {
    name: 'FullScreenFooterPage',
    path: '/full-screen/footer',
    component: () => import('@/views/full-screen/footer.vue')
  },
  {
    name: 'FullScreenEntityPage',
    path: '/full-screen/entity',
    component: () => import('@/views/full-screen/entity.vue')
  },
  {
    name: 'FullScreenVirtualPage',
    path: '/full-screen/virtual',
    component: () => import('@/views/full-screen/virtual.vue')
  }
]

export default routes
