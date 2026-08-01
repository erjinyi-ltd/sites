import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LegalView from '../views/LegalView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/privacy', name: 'privacy', component: LegalView, props: { kind: 'privacy' } },
    { path: '/terms', name: 'terms', component: LegalView, props: { kind: 'terms' } },
    { path: '/support', name: 'support', component: LegalView, props: { kind: 'support' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96, behavior: from.path === to.path ? 'smooth' : 'auto' }
    return { top: 0 }
  },
})

export default router
