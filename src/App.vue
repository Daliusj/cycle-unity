<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import { onMounted, watch } from 'vue';
import { useDark } from '@vueuse/core';
import useFireStore from '@/stores/fireStore/fireStore';
import useErrorStore from '@/stores/errorStore';
import useUserStore from './stores/userStore';
import router from './router/index';
import ROUTER_PATHS from './router/routerConfig';
import useWindowStore from './stores/useWindow';
import SideBar from './components/SideBar.vue';

const MIN_WIDTH_FOR_SIDE_BAR = 700;
const WIDTH_FOR_FULL_SIDE_BAR = 1000;
const ERROR_MESSAGE = `We're sorry, something went wrong on our end. Please try again later.
`;

const useWindow = useWindowStore();
const useFire = useFireStore();
const useUser = useUserStore();
const useError = useErrorStore();

onMounted(() => {
  useError.clearError();
  useUser.monitorAuthState();
  useWindow.addResizeListener();
  useWindow.addScrollListener();
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
      router.push(ROUTER_PATHS.home);
    } else {
      router.push(ROUTER_PATHS.login);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="useError.error" class="error-message">{{ ERROR_MESSAGE }}</div>
  <main
    :class="[
      { 'main-login': !useUser.userId },
      { 'body-margin': useWindow.windowWidth > MIN_WIDTH_FOR_SIDE_BAR },
      { 'main-desktop': useWindow.windowWidth > MIN_WIDTH_FOR_SIDE_BAR },
      { 'main-error': useError.error },
    ]"
  >
    <RouterView />
  </main>
  <SideBar
    v-if="useWindow.windowWidth > MIN_WIDTH_FOR_SIDE_BAR"
    :show-labels="useWindow.windowWidth > WIDTH_FOR_FULL_SIDE_BAR"
    :full-width="useWindow.windowWidth > WIDTH_FOR_FULL_SIDE_BAR"
  />
  <footer
    v-if="useUser.userId && useWindow.windowWidth <= MIN_WIDTH_FOR_SIDE_BAR"
  >
    <NavMenu :vertical="false" :show-labels="false" />
  </footer>
</template>
