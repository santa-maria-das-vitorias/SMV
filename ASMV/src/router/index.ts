import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ArticlesView from '@/views/ArticlesView.vue'

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
      path: '/sobre',
      name: 'about',
      component: AboutView,
    },
    {
      path:'/Artigos',
      name: 'article',
      component: ArticlesView,
    },
    {
      path: '/Artigos/:categoria/:titulo',
      name: 'article-specific',
      component: ArticlesView,
      props: true,
    },
  ],
})

export default router
