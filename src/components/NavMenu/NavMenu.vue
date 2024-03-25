<script setup lang="ts">
import profileUrl from '@/components/NavMenu/icons/profile.svg';
import eventsUrl from '@/components/NavMenu/icons/events.svg';
import homeUrl from '@/components/NavMenu/icons/home.svg';
import routesUrl from '@/components/NavMenu/icons/routes.svg';
import clubUrl from '@/components/NavMenu/icons/club.svg';
import RouteButton from '@/components/NavMenu/RouteButton.vue';

const { vertical } = defineProps<{ vertical: boolean }>();

const MENU_BUTTONS = [
  {
    label: 'Home',
    imageUrl: homeUrl,
    route: '/',
  },
  {
    label: 'Events',
    imageUrl: eventsUrl,
    route: '/events',
  },
  {
    label: 'Clubs',
    imageUrl: clubUrl,
    route: '/clubs',
  },
  {
    label: 'Routes',
    imageUrl: routesUrl,
    route: '/routes',
  },
  {
    label: 'Profile',
    imageUrl: profileUrl,
    route: '/profile',
  },
];
</script>

<template>
  <div class="nav" :class="vertical ? 'side' : 'bottom'">
    <RouteButton
      v-for="(button, index) in MENU_BUTTONS"
      :key="`menu-bar-${index}-${button.label}`"
      :imageUrl="button.imageUrl"
      :label="button.label"
      :route="button.route"
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
