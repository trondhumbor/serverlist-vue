import { createRouter, createWebHistory } from 'vue-router'
import ServerlistView from '@/views/ServerlistView.vue'
import DetailsView from '@/views/DetailsView.vue'

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
      component: DetailsView
    }
  ]
})

export default router
