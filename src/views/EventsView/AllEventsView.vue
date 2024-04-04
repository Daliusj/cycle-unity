<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import { onBeforeMount } from 'vue';
import EmptyContent from '@/components/EmptyContent.vue';
import useFireStore from '@/stores/fireStore/fireStore';
import { POST_FILTER_ALL_ID } from '@/stores/fireStore/fireStoreConfig';

const useFire = useFireStore();

onBeforeMount(() => {
  useFire.getFilteredEvents(POST_FILTER_ALL_ID);
});
</script>
<template>
  <PostCard
    v-for="post in useFire.eventsFiltered"
    :postData="post"
    :key="`post-${post.id}`"
  />
  <EmptyContent v-show="!useFire.eventsFiltered.length" />
</template>
@/stores/fireStore/fireStore
