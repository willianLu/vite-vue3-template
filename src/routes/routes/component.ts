import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/component/popup',
    name: 'ComponentPopupPage',
    component: () => import('@/views/component/popup.vue')
  }
]

export default routes
