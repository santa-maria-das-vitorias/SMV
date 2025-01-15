import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArticlesView from '@/views/ArticlesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
