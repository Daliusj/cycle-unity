<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMenu from '@/components/NavMenu/NavMenu.vue';
</script>

<template>
  <header>
    <img src="./assets/logo.png" width="60px" alt="cycle-logo" />
    Header
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
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 0;
}
footer {
  width: 100%;
  height: 8vh;
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
  width: 100%;
  top: 5vh;
  bottom: 10vh;
}
</style>
