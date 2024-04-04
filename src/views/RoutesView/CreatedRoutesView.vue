<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import { onBeforeMount } from 'vue';
import EmptyContent from '@/components/EmptyContent.vue';
import useFireStore from '@/stores/fireStore/fireStore';
import { POST_FILTER_CREATED } from '../../stores/fireStore/fireStoreConfig';

const useFire = useFireStore();

onBeforeMount(() => {
  useFire.getFilteredRoutes(POST_FILTER_CREATED);
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
