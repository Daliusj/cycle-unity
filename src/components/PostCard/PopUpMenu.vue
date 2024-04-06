<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { ref, computed } from 'vue';
import ContentButton from '@/components/ContentButton.vue';
import { useRouter, useRoute } from 'vue-router';
import useFireStore from '@/stores/fireStore/fireStore';
import ROUTER_PATHS from '@/router/routerConfig';
import {
  POST_FILTER_CREATED,
  POST_FILTER_HOSTED_ID,
  POST_FILTER_FAVORITES,
  POST_FILTER_GOING_ID,
  POST_FILTER_ALL_ID,
} from '@/stores/fireStore/fireStoreConfig';
import moreSVG from './icons/more.svg';
import useUserStore from '../../stores/userStore';

const DEFAULT_FILE_NAME = 'track.gpx';
const BLOB_TYPE = 'application/gpx+xml';
const TEXTS = {
  download: 'Download GPX',
  edit: 'Edit',
  hide: 'Hide post',
  delete: 'Delete',
};

const route = useRoute();
const router = useRouter();
const useFire = useFireStore();
const isMenuVisible = ref(false);
const isDark = useDark();
const { id, postType, authorId, gpxId, gpxData, gpxFileName } = defineProps<{
  id: string;
  postType: string;
  authorId: string;
  gpxId: string | null;
  gpxData: string | null;
  gpxFileName: string | null;
}>();
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
const useUser = useUserStore();
const isUserAuthor = computed(() => authorId === useUser.userId);

const getFilterOption = () => {
  if (route.path.endsWith(ROUTER_PATHS.eventsGoing))
    return POST_FILTER_GOING_ID;
  if (route.path.endsWith(ROUTER_PATHS.eventsHosted))
    return POST_FILTER_HOSTED_ID;
  if (route.path.endsWith(ROUTER_PATHS.routesCreated))
    return POST_FILTER_CREATED;
  if (route.path.endsWith(ROUTER_PATHS.routesFavorites))
    return POST_FILTER_FAVORITES;
  return POST_FILTER_ALL_ID;
};
const handelEditButtonClick = () => {
  toggleMenu();
  useFire.setPostToEdit(id);
  router.push(`/edit-${postType.toLowerCase()}`);
};
const handelHideButtonClick = () => {
  toggleMenu();
  useFire.setPostToHidden(id, getFilterOption());
};
const handelDeleteButtonClick = () => {
  useFire.deletePost(id, postType, gpxId, getFilterOption());
  toggleMenu();
};

const downloadGpx = (gpx: string, fileName: string) => {
  const blob = new Blob([gpx], { type: BLOB_TYPE });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const handelDownloadButtonClick = () => {
  if (gpxData) downloadGpx(gpxData, gpxFileName || DEFAULT_FILE_NAME);

  toggleMenu();
};
</script>
<template>
  <div>
    <ContentButton
      :imageUrl="moreSVG"
      :label="''"
      :buttonId="id"
      :key="id"
      @click="toggleMenu"
    />
    <div
      v-if="isMenuVisible"
      class="popup-menu"
      :class="isDark ? 'menu-background-dark' : 'menu-background-light'"
    >
      <ContentButton
        :label="TEXTS.download"
        :buttonId="`popup-menu-button-downloadgpx-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelDownloadButtonClick"
        v-show="gpxData"
      />
      <ContentButton
        :label="TEXTS.edit"
        :buttonId="`popup-menu-button-edit-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelEditButtonClick"
        v-show="isUserAuthor"
      />
      <ContentButton
        :label="TEXTS.hide"
        :buttonId="`popup-menu-button-hide-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelHideButtonClick"
      />
      <ContentButton
        :label="TEXTS.delete"
        :buttonId="`popup-menu-button-Delete-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelDeleteButtonClick"
        v-show="isUserAuthor"
      />
    </div>
  </div>
</template>
<style scoped>
.more-icon {
  width: 24px;
}

.popup-menu {
  position: absolute;
  right: 2rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 10px;
  padding: 10px;
}

.menu-background-light {
  background-color: white;
}
.menu-background-dark {
  background-color: black;
}

.btn {
  width: 130px;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.btn-dark {
  background-color: var(--vt-c-orange);
}
.btn-light {
  background-color: var(--vt-c-yellow);
}
</style>
../../stores/fireStore/fireStore
