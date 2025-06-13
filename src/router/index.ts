import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:chapters*',
      redirect: { name: 'user' },
    },
  ],
})

export default router
