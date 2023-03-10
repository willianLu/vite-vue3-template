import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/freegpt',
    name: 'FreeGptPage',
    component: () => import('@/views/FreeGpt.vue')
  }
]

export default routes
