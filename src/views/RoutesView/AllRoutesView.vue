<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import { onBeforeMount } from 'vue';
import EmptyContent from '@/components/EmptyContent.vue';
import useFireStore from '@/stores/fireStore/fireStore';

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
  <EmptyContent v-show="!useFire.routesFiltered.length" />
</template>
@/stores/fireStore/fireStore
