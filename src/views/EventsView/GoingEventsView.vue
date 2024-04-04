<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import { onBeforeMount } from 'vue';
import EmptyContent from '@/components/EmptyContent.vue';
import useFireStore from '@/stores/fireStore/fireStore';

const useFire = useFireStore();

onBeforeMount(() => {
  useFire.getFilteredEvents('going');
});

const handleGoingClick = () => {
  useFire.getFilteredEvents('going');
};
</script>
<template>
  <PostCard
    v-for="post in useFire.eventsFiltered"
    :postData="post"
    :key="`post-${post.id}`"
    @goingClick="handleGoingClick"
  />
  <EmptyContent v-show="!useFire.eventsFiltered.length" />
</template>
@/stores/fireStore/fireStore
