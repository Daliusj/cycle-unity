<script setup lang="ts">
import ContentMenu from '@/components/ContentMenu/ContentMenu.vue';
import { useRouter } from 'vue-router';
import ROUTER_PATHS from '@/router/routerConfig';

const BUTTON_LABEL = 'New Route';
const RADIO_OPTIONS = [
  { label: 'All', value: ROUTER_PATHS.routesAll },
  { label: 'Created', value: ROUTER_PATHS.routesCreated },
  { label: 'Favorites', value: ROUTER_PATHS.routesFavorites },
];
const router = useRouter();
const handleAddClick = (): void => {
  router.push(ROUTER_PATHS.newRoute);
};
</script>
<template>
  <div class="timeline">
    <ContentMenu
      :buttonLabel="BUTTON_LABEL"
      :radioOptions="RADIO_OPTIONS"
      @addClick="handleAddClick"
    />
    <RouterView />
  </div>
</template>

<style scoped>
.timeline {
  width: 100%;
  min-height: 100%;
}
</style>
