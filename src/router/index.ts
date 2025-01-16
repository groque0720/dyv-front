import { authRoutes } from '@/modules/auth/routes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'login' },
      // component: () => import('@/modules/common/layouts/MainLayout.vue'),
    },
    authRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      // redirect: { name: 'home' }
      component: () => import('@/modules/common/views/NotFoundView.vue'),
      meta: { title: 'Error' },
    },
  ],
});

// Cambiar el título dinámicamente
router.beforeEach((to, from, next) => {
  const defaultTitle = 'Derka y Vargas'; // Título por defecto
  console.log(to.meta.title);
  document.title = (to.meta.title as string) || defaultTitle;
  next();
});

export default router;
