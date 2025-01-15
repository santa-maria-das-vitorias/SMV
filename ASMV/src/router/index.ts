import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'

interface ImportMetaEnv {
  readonly BASE_URL: string;
  // add other environment variables here
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
