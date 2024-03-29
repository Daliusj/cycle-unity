<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import ContentMenu from '@/components/ContentMenu/ContentMenu.vue';
import { useRouter } from 'vue-router';
import useFireStore from '@/stores/fireStore';

const BUTTON_LABEL = 'New Route';
const RADIO_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Created', value: 'created' },
  { label: 'Favorites', value: 'favorites' },
];

const useFire = useFireStore();
const router = useRouter();

const handleAddClick = (): void => {
  router.push('/new-route');
};
</script>
<template>
  <div class="timeline">
    <ContentMenu
      :buttonLabel="BUTTON_LABEL"
      :radioOptions="RADIO_OPTIONS"
      @addClick="handleAddClick"
      @optionSelect="useFire.getFilteredRoutes"
    />
    <PostCard
      v-for="(post, index) in useFire.routesFiltered"
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
