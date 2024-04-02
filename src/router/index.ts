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
      component: () => import('@/views/EventsView/EventsView.vue'),
      children: [
        {
          path: 'all',
          name: 'All Events',
          component: () => import('@/views/EventsView/AllEventsView.vue'),
        },
        {
          path: 'hosted',
          name: 'Hosted Events',
          component: () => import('@/views/EventsView/HostedEventsView.vue'),
        },
        {
          path: 'going',
          name: 'Going Events',
          component: () => import('@/views/EventsView/GoingEventsView.vue'),
        },
      ],
    },
    {
      path: '/clubs',
      name: 'Clubs',
      component: () => import('@/views/ClubsView.vue'),
    },
    {
      path: '/routes',
      name: 'Routes',
      component: () => import('@/views/RoutesView/RoutesView.vue'),
      children: [
        {
          path: 'all',
          name: 'All Routes',
          component: () => import('@/views/RoutesView/AllRoutesView.vue'),
        },
        {
          path: 'created',
          name: 'Created Routes',
          component: () => import('@/views/RoutesView/CreatedRoutesView.vue'),
        },
        {
          path: 'favorites',
          name: 'Favorite Routes',
          component: () => import('@/views/RoutesView/FavoritesRoutesView.vue'),
        },
      ],
    },
    {
      path: '/new-event',
      name: 'New Event',
      component: () => import('@/views/EventsView/NewEventView.vue'),
    },
    {
      path: '/new-route',
      name: 'New Route',
      component: () => import('@/views/RoutesView/NewRouteView.vue'),
    },
    {
      path: '/edit-event',
      name: 'Edit Event',
      component: () => import('@/views/EventsView/EditEventView.vue'),
    },
    {
      path: '/edit-route',
      name: 'Edit Route',
      component: () => import('@/views/RoutesView/EditRouteView.vue'),
    },
    {
      path: '/login',
      name: 'Log in',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Sign up',
      component: () => import('@/views/SignupView.vue'),
    },
  ],
});

export default router;
