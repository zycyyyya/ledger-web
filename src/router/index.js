import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/add',
    name: 'AddRecord',
    component: () => import('@/views/AddRecord.vue')
  },
  {
    path: '/bill',
    name: 'BillList',
    component: () => import('@/views/BillList.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/Statistics.vue')
  },
  {
    path: '/assets',
    name: 'Assets',
    component: () => import('@/views/Assets.vue')
  },
  {
    path: '/reimburse',
    name: 'Reimburse',
    component: () => import('@/views/Reimburse.vue')
  },
  {
    path: '/budget',
    name: 'Budget',
    component: () => import('@/views/Budget.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
