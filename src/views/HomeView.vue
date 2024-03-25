<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
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
    id: '256457',
    type: 'Route',
    author: 'Tommy Biker',
    authorAvatar: './src/assets/avatars/cyclist-3.png',
    availability: 'private',
    title: '100km trail',
    details: 'Details',
    gpxUrl: './src/components/MapBox/track.gpx',
  },
];
</script>

<template>
  <div class="timeline">
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
