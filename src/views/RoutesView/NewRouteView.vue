<script setup lang="ts">
import PostForm from '@/components/PostForm/PostForm.vue';
import { POST_DATA_TYPE_ROUTE_ID } from '../../stores/fireStore/fireStoreConfig';
</script>
<template>
  <div class="form-container">
    <PostForm :postType="POST_DATA_TYPE_ROUTE_ID" :mode="'new'" />
  </div>
</template>
<style scoped>
.form-container {
  min-height: 100%;
  padding: var(--main-padding);
  width: 100%;
}
</style>
