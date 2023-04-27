import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/skeleton',
    name: 'SkeletonPage',
    component: () => import('@/views/Skeleton.vue')
  },
  {
    name: 'MyPage',
    path: '/my',
    component: () => import('@/views/My.vue')
  },
  {
    name: 'SearchPage',
    path: '/search',
    component: () => import('@/views/search/index.vue')
  }
]

export default routes
