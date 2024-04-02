<script setup lang="ts">
import SignupForm from '@/components/SignupForm.vue';
</script>

<template>
  <div class="login">
    <SignupForm />
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
