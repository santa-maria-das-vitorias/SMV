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
      name: 'Início',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/padroeiros',
      name: 'Patronos',
      component: () => import('@/views/PadroeirosView.vue')
    },
    {
      path: '/liturgia',
      name: 'Liturgia',
      component: () => import('@/views/LiturgiaView.vue')
    },
    {
      path: '/contato',
      name: 'Contato',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/politica-de-privacidade',
      name: 'Política de Privacidade',
      component: () => import('@/views/PoliticaView.vue')
    },
    {
      path: '/carta-dos-cardeais-ottaviani-e-bacci-contra-a-promulgacao-da-missa-nova',
      name: 'Carta dos Cardeais Ottaviani e Bacci contra a promulgação da Missa Nova',
      component: () => import('@/views/CartaView.vue')
    },
    {
      path: '/artigos',
      name: 'Artigos',
      component:  () => import('@/views/ComingView.vue'),
      props: true,
    },
    {
      path: '/projetos',
      name: 'Projetos',
      component:  () => import('@/views/ComingView.vue'),
      props: true,
    },
    {
      path: '/suma-teologica',
      name: 'Suma Teologica',
      component:  () => import('@/views/ComingView.vue'),
      props: true,
    },
    {
      path: '/fotos',
      name: 'Fotos',
      component:  () => import('@/views/ComingView.vue'),
      props: true,
    },
    {
      path: '/:categoria',
      name: 'Categoria',
      component:  () => import('@/views/Articles/CategoryView.vue'),
      props: true,
    },
    {
      path: '/:categoria/:slug',
      name: 'Artigo',
      component:  () => import('@/views/Articles/ArticleView.vue'),
      props: route => ({ categoria: route.params.categoria, slug: route.params.slug }),
    },
  ],
})

export default router
