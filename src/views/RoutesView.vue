<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import ContentMenu from '@/components/ContentMenu/ContentMenu.vue';
import { useRouter } from 'vue-router';
import type { LatLngTuple } from 'leaflet';

export type Post = {
  id: string;
  type: string;
  author: string;
  authorAvatar: string;
  availability: string;
  title: string;
  details: string;
  date?: string;
  time?: string;
  startCoordinates?: LatLngTuple;
  gpxUrl?: string;
};

const mockPosts: Post[] = [
  {
    id: '256457',
    type: 'Route',
    author: 'Tommy Biker',
    authorAvatar: './src/assets/avatars/cyclist-3.png',
    availability: 'private',
    title: '100km trail',
    details: 'Details',
    gpxUrl: './src/components/MapBox/track.gpx',
  },
  {
    id: '256454357',
    type: 'Route',
    author: 'Jimm Bonker',
    authorAvatar: './src/assets/avatars/cyclist-3.png',
    availability: 'public',
    title: '100km trail',
    details: 'Details',
    gpxUrl: './src/components/MapBox/track.gpx',
  },
];

const BUTTON_LABEL = 'New Route';

const RADIO_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Created', value: 'created' },
  { label: 'Favorites', value: 'favorites' },
];

const router = useRouter();

const handleOptionSelect = (option: string): void => {
  console.log('Routes filter', option);
};

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
      @optionSelect="handleOptionSelect"
    />
    <PostCard
      v-for="(post, index) in mockPosts"
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
