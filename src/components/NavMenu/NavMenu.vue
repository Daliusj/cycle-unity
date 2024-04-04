<script setup lang="ts">
import { useRoute } from 'vue-router';
import profileUrl from '@/components/NavMenu/icons/profile.svg';
import eventsUrl from '@/components/NavMenu/icons/events.svg';
import homeUrl from '@/components/NavMenu/icons/home.svg';
import routesUrl from '@/components/NavMenu/icons/routes.svg';
import clubUrl from '@/components/NavMenu/icons/club.svg';
import RouteButton from '@/components/NavMenu/RouteButton.vue';
import ROUTER_PATHS from '@/router/routerConfig';

const { vertical } = defineProps<{ vertical: boolean }>();
const route = useRoute();

const MENU_BUTTONS = [
  {
    label: 'Home',
    imageUrl: homeUrl,
    route: ROUTER_PATHS.home,
  },
  {
    label: 'Events',
    imageUrl: eventsUrl,
    route: ROUTER_PATHS.eventsAll,
  },
  {
    label: 'Clubs',
    imageUrl: clubUrl,
    route: ROUTER_PATHS.clubs,
  },
  {
    label: 'Routes',
    imageUrl: routesUrl,
    route: ROUTER_PATHS.routesAll,
  },
  {
    label: 'Profile',
    imageUrl: profileUrl,
    route: ROUTER_PATHS.profile,
  },
];

const handleRouting = (buttonRoute: string) => {
  if (
    buttonRoute.startsWith(ROUTER_PATHS.events) &&
    route.path.startsWith(ROUTER_PATHS.events)
  ) {
    return route.path;
  }
  if (
    buttonRoute.startsWith(ROUTER_PATHS.routes) &&
    route.path.startsWith(ROUTER_PATHS.routes)
  ) {
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
