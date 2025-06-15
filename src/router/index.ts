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
      path: '/patient',
      name: 'Patient',
      component: () => import('../views/Patient/PatientView.vue'),
    },

    {
      path: '/patient/create',
      name: 'PatientCreate',
      component: () => import('../views/Patient/PatientCreateUpdateView.vue'),
    },
    {
      path: '/patient/:id',
      name: 'PatientUpdate',
      component: () => import('../views/Patient/PatientCreateUpdateView.vue'),
    },
    {
      path: '/appointment',
      name: 'Appointment',
      component: () => import('../views/Appointment/AppointmentView.vue'),
    },
    {
      path: '/appointment/create',
      name: 'AppointmentCreate',
      component: () => import('../views/Appointment/AppointmentCreateUpdateView.vue'),
    },
    {
      path: '/appointment/:id',
      name: 'AppointmentUpdate',
      component: () => import('../views/Appointment/AppointmentCreateUpdateView.vue'),
    },
    {
      path: '/:chapters*',
      redirect: { name: 'Appointment' },
    },
  ],
})

export default router
