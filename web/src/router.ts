import { createWebHistory, createRouter } from 'vue-router';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./views/HomePage.vue') },
    {
      path: '/i/:ref',
      redirect(to) {
        // http://127.0.0.1:8920/i/IActivityTaskManager#getTasks
        return {
          path: '/',
          query: {
            ref: to.params.ref + to.hash,
          },
          hash: '',
        };
      },
    },
    {
      path: '/i/:clazz/:prop',
      redirect(to) {
        // http://127.0.0.1:8920/i/IActivityTaskManager/getTasks
        return {
          path: '/',
          query: {
            ref: `${to.params.clazz}#${to.params.prop}`,
          },
        };
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./views/404Page.vue'),
    },
  ],
});
