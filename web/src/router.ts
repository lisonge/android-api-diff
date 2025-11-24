import { createWebHistory, createRouter } from 'vue-router';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./views/HomePage.vue') },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./views/404Page.vue'),
    },
  ],
});
