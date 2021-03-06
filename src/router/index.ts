import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/editor',
  },
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/editor',
    component: () => import('@/views/Editor/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
