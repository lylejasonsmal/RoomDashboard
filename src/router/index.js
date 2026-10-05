import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import HistoryPage from '@/views/HistoryPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage,
      meta: {
        icon: 'dashboard',
        category: 'basic'
      }
    },{
      path: '/history',
      name: 'History',
      component: HistoryPage,
      meta: {
        icon: 'history',
        category: 'basic'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PageNotFound,
      meta: {
        icon: 'error',
        category: 'utility'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return {
      top: 0,
      behavior: 'smooth'
    }
  },
})

export default router
