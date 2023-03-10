import { RouteRecordRaw } from 'vue-router'

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
    component: () => import('@/views/NormalH5.vue')
  },
  {
    path: '/special-h5',
    name: 'SpecialH5Page',
    component: () => import('@/views/SpecialH5.vue')
  },
  {
    path: '/page-a',
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

export default routes
