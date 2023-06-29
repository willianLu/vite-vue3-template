import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'LoginPage',
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    name: 'PrivacyPolicyPage',
    path: '/agreement/privacy-policy',
    component: () => import('@/views/agreement/privacyPolicy.vue')
  },
  {
    name: 'UserServicePage',
    path: '/agreement/user-service',
    component: () => import('@/views/agreement/userService.vue')
  },
  {
    name: 'ForgetPasswordPage',
    path: '/forget-password',
    component: () => import('@/views/login/forgetPassword.vue')
  },
  {
    name: 'ModifyPasswordPage',
    path: '/modify-password',
    component: () => import('@/views/login/modifyPassword.vue')
  }
]

export default routes
