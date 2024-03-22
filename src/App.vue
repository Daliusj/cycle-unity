<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import { useToggle, useDark } from '@vueuse/core';

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <header>
    <button type="button" @click="toggleDark()">
      <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
      {{ isDark ? 'Dark' : 'Light' }}
    </button>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <NavMenu :vertical="false" />
  </footer>
</template>

<style scoped>
header {
  width: 100%;
  padding-top: var(--main-padding);
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer {
  width: 100%;
  bottom: var(--footer-height);
  position: fixed;
  z-index: 1;
  bottom: 0;
}

main {
  overflow-y: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--main-padding);
  width: 100%;
  top: var(--header-height);
  bottom: var(--footer-height);
}
</style>
