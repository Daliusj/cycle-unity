<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import useFireStore from '@/stores/fireStore';
import { onBeforeMount } from 'vue';

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
</template>
