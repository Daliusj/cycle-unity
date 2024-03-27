<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import useFireStore from '@/stores/fireStore';

const useFire = useFireStore();
</script>

<template>
  <div class="timeline">
    <PostCard
      v-for="(post, index) in [...useFire.events, ...useFire.routes]"
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
