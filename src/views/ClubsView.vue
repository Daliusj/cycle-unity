<script setup lang="ts">
import { useDark } from '@vueuse/core';
import useWindowStore from '@/stores/useWindow';

const MIN_WIDTH_FOR_SIDE_BAR = 680;
const MESSAGE_TEXT = 'Clubs coming soon!';
const useWindow = useWindowStore();
const isDark = useDark();
</script>
<template>
  <div
    class="background"
    :class="{
      'background-desktop': useWindow.windowWidth > MIN_WIDTH_FOR_SIDE_BAR,
    }"
  >
    <div class="logo" :class="[isDark ? 'text-dark' : 'text-light']">
      {{ MESSAGE_TEXT }}
    </div>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  width: 100%;
  height: 90%;
  overflow: hidden;
  background-image: url('../assets/clubs-background.png');
  background-size: cover;
  background-position: left 55% center;
  filter: brightness(90%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-desktop {
  height: 100%;
}

.text-dark {
  color: var(--vt-c-orange);
}

.text-light {
  color: var(--vt-c-yellow);
}

.logo {
  text-align: center;
  font-size: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  /* height: 132px; */
  padding: 2rem 0 2rem 0;
}
</style>
