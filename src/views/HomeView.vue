<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';

export type Post = {
  id: string;
  type: string;
  author: string;
  authorAvatar: string;
  availability: string;
  title: string;
  details: string;
  coordinates: [number, number];
};

const mockPosts: Post[] = [
  {
    id: '1345345',
    type: 'Event',
    author: 'John Rider',
    authorAvatar: './src/assets/avatars/cyclist-1.png',
    availability: 'public',
    title: 'Friday coffe ride',
    details: 'Details',
    coordinates: [54.8985, 23.9036],
  },
  {
    id: '256457',
    type: 'Route',
    author: 'Tommy Biker',
    authorAvatar: './src/assets/avatars/cyclist-3.png',
    availability: 'private',
    title: '100km trail',
    details: 'Details',
    coordinates: [54.6872, 25.2797],
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
