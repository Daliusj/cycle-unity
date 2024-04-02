<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import useFireStore from '@/stores/fireStore';
import { onBeforeMount } from 'vue';

const useFire = useFireStore();

onBeforeMount(() => {
  useFire.getFilteredRoutes('all');
});
</script>
<template>
  <PostCard
    v-for="post in useFire.routesFiltered"
    :postData="post"
    :key="`post-${post.id}`"
  />
</template>
