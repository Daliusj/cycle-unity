<script setup lang="ts">
import { useRoute } from 'vue-router';
import profileUrl from '@/components/NavMenu/icons/profile.svg';
import eventsUrl from '@/components/NavMenu/icons/events.svg';
import homeUrl from '@/components/NavMenu/icons/home.svg';
import routesUrl from '@/components/NavMenu/icons/routes.svg';
import clubUrl from '@/components/NavMenu/icons/club.svg';
import RouteButton from '@/components/NavMenu/RouteButton.vue';

const { vertical } = defineProps<{ vertical: boolean }>();
const route = useRoute();

const MENU_BUTTONS = [
  {
    label: 'Home',
    imageUrl: homeUrl,
    route: '/',
  },
  {
    label: 'Events',
    imageUrl: eventsUrl,
    route: '/events/all',
  },
  {
    label: 'Clubs',
    imageUrl: clubUrl,
    route: '/clubs',
  },
  {
    label: 'Routes',
    imageUrl: routesUrl,
    route: '/routes/all',
  },
  {
    label: 'Profile',
    imageUrl: profileUrl,
    route: '/profile',
  },
];

const handleRouting = (buttonRoute: string) => {
  if (buttonRoute.startsWith('/events') && route.path.startsWith('/events')) {
    return route.path;
  }
  if (buttonRoute.startsWith('/routes') && route.path.startsWith('/routes')) {
    return route.path;
  }
  return buttonRoute;
};
</script>

<template>
  <div class="nav" :class="vertical ? 'side' : 'bottom'">
    <RouteButton
      v-for="(button, index) in MENU_BUTTONS"
      :key="`menu-bar-${index}-${button.label}`"
      :imageUrl="button.imageUrl"
      :label="button.label"
      :route="handleRouting(button.route)"
      :showTitle="vertical"
    />
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  padding: 10px 0;
}

.bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.side {
  width: 150px;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
}
</style>
