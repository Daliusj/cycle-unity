<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import useFireStore from '@/stores/fireStore';

const useFire = useFireStore();
useFire.fetchEvents();
useFire.fetchRoutes();
useFire.fetchUserContent();
</script>

<template>
  <main>
    <RouterView />
  </main>
  <footer>
    <NavMenu :vertical="false" />
  </footer>
</template>
