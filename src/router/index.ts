import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User/UserView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/user/create',
      name: 'UserCreate',
      component: () => import('../views/User/UserCreatedView.vue'),
    },
    {
      path: '/user/:id',
      name: 'UserUpdate',
      component: () => import('../views/User/UserUpdateView.vue'),
    },
    {
      path: '/:chapters*',
      redirect: { name: 'user' },
    },
  ],
})

export default router
