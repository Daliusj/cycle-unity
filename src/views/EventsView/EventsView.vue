<script setup lang="ts">
import ContentMenu from '@/components/ContentMenu/ContentMenu.vue';
import { useRouter } from 'vue-router';
import ROUTER_PATHS from '@/router/routerConfig';

const BUTTON_LABEL = 'New Event';
const RADIO_OPTIONS = [
  { label: 'All', value: ROUTER_PATHS.eventsAll },
  { label: 'Hosted', value: ROUTER_PATHS.eventsHosted },
  { label: 'Going', value: ROUTER_PATHS.eventsGoing },
];

const router = useRouter();

const handleAddClick = (): void => {
  router.push(ROUTER_PATHS.newEvent);
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
