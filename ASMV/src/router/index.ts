import { createRouter, createWebHistory } from 'vue-router'

interface ImportMetaEnv {
  readonly BASE_URL: string;
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
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/sobre',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },

    {
      path: '/padroeiros',
      name: 'Patrons',
      component: () => import('@/views/PadroeirosView.vue')
    },
    {
      path: '/liturgia',
      name: 'liturgy',
      component: () => import('@/views/LiturgiaView.vue')
    },
    {
      path: '/contato',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/:categoria',
      name: 'article-specific',
      component:  () => import('@/views/Articles/CategoryView.vue'),
      props: true,
    },
    {
      path: '/:categoria/:slug',
      name: 'SingleArticle',
      component:  () => import('@/views/Articles/ArticleView.vue'),
      props: route => ({ categoria: route.params.categoria, slug: route.params.slug }),
    },
  ],
})

export default router
