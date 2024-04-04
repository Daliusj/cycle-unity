<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import { onBeforeMount } from 'vue';
import useFireStore from '@/stores/fireStore/fireStore';
import { POST_FILTER_FAVORITES } from '../../stores/fireStore/fireStoreConfig';

const useFire = useFireStore();

onBeforeMount(() => {
  useFire.getFilteredRoutes(POST_FILTER_FAVORITES);
});

const handleGoingClick = () => {
  useFire.getFilteredRoutes(POST_FILTER_FAVORITES);
};
</script>
<template>
  <PostCard
    v-for="post in useFire.routesFiltered"
    :postData="post"
    :key="`post-${post.id}`"
    @going-click="handleGoingClick"
  />
  <EmptyContent v-show="!useFire.routesFiltered.length" />
</template>
@/stores/fireStore/fireStore
