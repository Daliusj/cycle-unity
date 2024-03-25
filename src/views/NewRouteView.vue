<script setup lang="ts">
import PostForm from '@/components/PostForm/PostForm.vue';
</script>
<template>
  <div class="form-container">
    <PostForm :postType="'route'" :mode="'new'" />
  </div>
</template>
<style scoped>
.form-container {
  min-height: 100%;
  padding: var(--main-padding);
}
</style>
