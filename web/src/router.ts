import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/HomePage.vue') },
  {
    path: '/:pathMatch(.*)*',
    component: import('./views/404Page.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
