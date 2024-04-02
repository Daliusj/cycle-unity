<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <div class="login">
    <LoginForm />
  </div>
</template>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: var(--main-padding);
  width: 100%;
}
</style>
