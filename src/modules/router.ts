import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@master/views/static/DashboardView.vue'
import CvListView from '@master/views/cv/ListView.vue'
import HomeScreenMobile from '@master/views/static/HomeScreenMobile.vue'
import NotFoundView from '@master/views/static/NotFoundView.vue'

import master from '@master/routers/index.master.router'
import auth from '@auth/routers/index.auth.router'
import app from '@app/routers/index.app.router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ======================= STATIC PAGE =========================
    {
      path: '/404',
      name: 'NotFound',
      component: NotFoundView,
    },

    // ======================= NOT FOUND =========================
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: {
        layout: 'Admin',
      },
    },
    {
      path: '/cv',
      name: 'CV',
      component: CvListView,
      meta: {
        layout: 'Admin',
      },
    },
    // =================== mobile: Home Screen ====================
    {
      path: '/mobile',
      name: 'HomeScreen',
      component: HomeScreenMobile,
      meta: {
        layout: 'Mobile',
      },
    },
    ...master,
    ...auth,
    ...app,
  ],
})

export default router
