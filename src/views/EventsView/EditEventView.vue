<script setup lang="ts">
import PostForm from '@/components/PostForm/PostForm.vue';
import { EDIT_MODE_ID } from '@/components/PostForm/config';
import { POST_DATA_TYPE_EVENT_ID } from '../../stores/fireStore/fireStoreConfig';
</script>
<template>
  <div class="form-container">
    <PostForm :postType="POST_DATA_TYPE_EVENT_ID" :mode="EDIT_MODE_ID" />
  </div>
</template>
<style scoped>
.form-container {
  min-height: 100%;
  padding: var(--main-padding);
  width: 100%;
}
</style>
