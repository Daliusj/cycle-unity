<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { useDark } from '@vueuse/core';

const LOGO_TEXT = 'Cycle Unity';

const isDark = useDark();
</script>

<template>
  <div class="background">
    <div class="logo" :class="isDark ? 'text-dark' : 'text-light'">
      {{ LOGO_TEXT }}
    </div>
    <div class="login-container">
      <LoginForm />
    </div>
  </div>
</template>
<style scoped>
.background {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('../assets/login-background.png');
  background-size: cover;
  background-position: left 60% center;
  filter: brightness(90%);
}

.login-container {
  color: white;
  display: flex;
  justify-content: center;
  padding: var(--main-padding);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  margin-bottom: 10vh;
}

.logo {
  font-size: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0 2rem 0;
}

.text-dark {
  color: var(--vt-c-orange);
}

.text-light {
  color: var(--vt-c-yellow);
}
</style>
