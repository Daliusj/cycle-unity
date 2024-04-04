import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ROUTER_PATHS from './routerConfig';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATHS.home,
      name: 'home',
      component: HomeView,
    },
    {
      path: ROUTER_PATHS.profile,
      name: 'Profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: ROUTER_PATHS.events,
      name: 'Events',
      component: () => import('@/views/EventsView/EventsView.vue'),
      children: [
        {
          path: ROUTER_PATHS.allEndpoint,
          name: 'All Events',
          component: () => import('@/views/EventsView/AllEventsView.vue'),
        },
        {
          path: ROUTER_PATHS.hostedEndpoint,
          name: 'Hosted Events',
          component: () => import('@/views/EventsView/HostedEventsView.vue'),
        },
        {
          path: ROUTER_PATHS.goingEndpoint,
          name: 'Going Events',
          component: () => import('@/views/EventsView/GoingEventsView.vue'),
        },
      ],
    },
    {
      path: ROUTER_PATHS.clubs,
      name: 'Clubs',
      component: () => import('@/views/ClubsView.vue'),
    },
    {
      path: ROUTER_PATHS.routes,
      name: 'Routes',
      component: () => import('@/views/RoutesView/RoutesView.vue'),
      children: [
        {
          path: ROUTER_PATHS.allEndpoint,
          name: 'All Routes',
          component: () => import('@/views/RoutesView/AllRoutesView.vue'),
        },
        {
          path: ROUTER_PATHS.createdEndpoint,
          name: 'Created Routes',
          component: () => import('@/views/RoutesView/CreatedRoutesView.vue'),
        },
        {
          path: ROUTER_PATHS.favoritesEndpoint,
          name: 'Favorite Routes',
          component: () => import('@/views/RoutesView/FavoritesRoutesView.vue'),
        },
      ],
    },
    {
      path: ROUTER_PATHS.newEvent,
      name: 'New Event',
      component: () => import('@/views/EventsView/NewEventView.vue'),
    },
    {
      path: ROUTER_PATHS.newRoute,
      name: 'New Route',
      component: () => import('@/views/RoutesView/NewRouteView.vue'),
    },
    {
      path: ROUTER_PATHS.editEvent,
      name: 'Edit Event',
      component: () => import('@/views/EventsView/EditEventView.vue'),
    },
    {
      path: ROUTER_PATHS.editRoute,
      name: 'Edit Route',
      component: () => import('@/views/RoutesView/EditRouteView.vue'),
    },
    {
      path: ROUTER_PATHS.login,
      name: 'Log in',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: ROUTER_PATHS.signup,
      name: 'Sign up',
      component: () => import('@/views/SignupView.vue'),
    },
  ],
});

export default router;
