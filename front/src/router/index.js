import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/tracking-line/:trackingLineId',
      name: 'tracking-line',
      component: () => import('../views/TrackingLine.vue')
    },
  ]
})

export default router
