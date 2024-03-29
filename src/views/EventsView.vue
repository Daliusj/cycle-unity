<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import ContentMenu from '@/components/ContentMenu/ContentMenu.vue';
import { useRouter } from 'vue-router';
import useFireStore from '@/stores/fireStore';

const BUTTON_LABEL = 'New Event';
const RADIO_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Hosted', value: 'hosted' },
  { label: 'Going', value: 'going' },
];

const useFire = useFireStore();
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
      @optionSelect="useFire.getFilteredEvents"
    />
    <PostCard
      v-for="(post, index) in useFire.eventsFiltered"
      :postData="post"
      :key="`post-${index}`"
    />
  </div>
</template>

<style scoped>
.timeline {
  width: 100%;
  min-height: 100%;
}
</style>
