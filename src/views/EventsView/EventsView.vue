<script setup lang="ts">
import ContentMenu from '@/components/ContentMenu/ContentMenu.vue';
import { useRouter } from 'vue-router';

const BUTTON_LABEL = 'New Event';
const RADIO_OPTIONS = [
  { label: 'All', value: '/events/all' },
  { label: 'Hosted', value: '/events/hosted' },
  { label: 'Going', value: '/events/going' },
];

const router = useRouter();

const handleAddClick = (): void => {
  router.push('/new-event');
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
