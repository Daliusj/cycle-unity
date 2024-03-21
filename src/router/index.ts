import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('@/views/EventsView.vue'),
    },
    {
      path: '/clubs',
      name: 'Clubs',
      component: () => import('@/views/ClubsView.vue'),
    },
    {
      path: '/routes',
      name: 'Routes',
      component: () => import('@/views/RoutesView.vue'),
    },
  ],
});

export default router;
