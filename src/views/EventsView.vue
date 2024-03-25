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
    id: '1345345',
    type: 'Event',
    author: 'John Rider',
    authorAvatar: './src/assets/avatars/cyclist-1.png',
    availability: 'public',
    title: 'Friday coffe ride',
    details: 'Lets go for friday coffe ride',
    date: '2024-04-02',
    time: '17:00',
    startCoordinates: [54.8985, 23.9036],
  },
  {
    id: '13453445',
    type: 'Event',
    author: 'John Rider',
    authorAvatar: './src/assets/avatars/cyclist-1.png',
    availability: 'public',
    title: 'Gravel race',
    details: 'Race race race',
    date: '2024-04-05',
    time: '10:00',
    startCoordinates: [55.8885, 23.8836],
  },
];

const BUTTON_LABEL = 'New Event';

const RADIO_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Hosted', value: 'hosted' },
  { label: 'Going', value: 'going' },
];

const router = useRouter();

const handleOptionSelect = (option: string): void => {
  console.log('Event filter', option);
};

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
