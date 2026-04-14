import { createWebHistory, createRouter } from 'vue-router';

const homeFc = () => import('./views/home/HomePage.vue');
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // /?url=1&name=2&prop=3
      path: '/',
      component: homeFc,
      beforeEnter: (to, from, next) => {
        if (to.query.ref) {
          next(`/i/${to.query.ref}`);
        } else {
          next();
        }
      },
    },
    {
      // /i/IActivityTaskManager#getTasks
      path: '/i/:pathMatch(.*)*',
      component: homeFc,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./views/404Page.vue'),
    },
  ],
});
