import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LegalView from '../views/LegalView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: LegalView,
      meta: { legalKind: 'privacy' },
    },
    {
      path: '/terms',
      name: 'terms',
      component: LegalView,
      meta: { legalKind: 'terms' },
    },
    {
      path: '/support',
      name: 'support',
      component: LegalView,
      meta: { legalKind: 'support' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return {
        el: to.hash,
        top: 84,
        behavior: reducedMotion ? 'auto' : 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
