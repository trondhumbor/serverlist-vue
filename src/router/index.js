import { createRouter, createWebHistory } from 'vue-router'
import ServerlistView from '@/views/ServerlistView.vue'
import Details from '@/components/Details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'serverlist',
      component: ServerlistView
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
  ]
})

export default router
