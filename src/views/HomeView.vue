<script setup lang="ts">
import PostCard from '@/components/PostCard/PostCard.vue';
import EmptyContent from '@/components/EmptyContent.vue';
import useFireStore from '@/stores/fireStore/fireStore';

const useFire = useFireStore();
</script>

<template>
  <div class="timeline">
    <PostCard
      v-for="post in [...useFire.events, ...useFire.routes]"
      :postData="post"
      :key="`post-${post.id}`"
    />
    <EmptyContent v-show="![...useFire.events, ...useFire.routes].length" />
  </div>
</template>
<style scoped>
.timeline {
  width: 100%;
  min-height: 100%;
}
</style>
@/stores/fireStore/fireStore
