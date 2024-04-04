<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import { onMounted, watch } from 'vue';
import { useDark } from '@vueuse/core';
import useFireStore from '@/stores/fireStore/fireStore';
import useUserStore from './stores/userStore';
import router from './router/index';

const useFire = useFireStore();
const useUser = useUserStore();

onMounted(() => {
  useUser.monitorAuthState();
});
useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});
watch(
  () => useUser.userId,
  userId => {
    if (userId) {
      useFire.fetchEvents();
      useFire.fetchRoutes();
      useFire.fetchUserContent();
      useFire.fetchUserDetails();
      useFire.fetchComments();
      router.push('/');
    } else {
      router.push('/login');
    }
  },
  { immediate: true },
);
</script>

<template>
  <main :class="{ 'main-login': !useUser.userId }">
    <RouterView />
  </main>
  <footer v-if="useUser.userId">
    <NavMenu :vertical="false" />
  </footer>
</template>
<style scoped>
.main-login {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
@/stores/fireStore/fireStore
