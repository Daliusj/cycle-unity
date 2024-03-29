<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { ref, computed } from 'vue';
import ContentButton from '@/components/ContentButton.vue';
import { useRouter } from 'vue-router';
import moreSVG from './icons/more.svg';
import useUserStore from '../../stores/userStore';
import useFireStore from '../../stores/fireStore';

const router = useRouter();
const useFire = useFireStore();
const isMenuVisible = ref(false);
const isDark = useDark();
const { id, postType, authorId, gpxId, gpxData, gpxFileName } = defineProps<{
  id: string;
  postType: string;
  authorId: string;
  gpxId: string | undefined;
  gpxData: string | undefined;
  gpxFileName: string | undefined;
}>();
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
const useUser = useUserStore();
const isUserAuthor = computed(() => authorId === useUser.userId);

const handelEditButtonClick = () => {
  toggleMenu();
  useFire.setPostToEdit(id);
  router.push(`/edit-${postType.toLowerCase()}`);
};
const handelHideButtonClick = () => {
  toggleMenu();
  useFire.setPostToHidden(id);
};
const handelDeleteButtonClick = () => {
  toggleMenu();
  useFire.deletePost(id, postType, gpxId);
};

const downloadGpx = (gpx: string, fileName: string) => {
  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
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
  if (gpxData) downloadGpx(gpxData, gpxFileName || 'route.gpx');

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
        label="Download GPX"
        :buttonId="`popup-menu-button-downloadgpx-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelDownloadButtonClick"
        v-show="gpxData"
      />
      <ContentButton
        label="Edit"
        :buttonId="`popup-menu-button-edit-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelEditButtonClick"
        v-show="isUserAuthor"
      />
      <ContentButton
        label="Hide post"
        :buttonId="`popup-menu-button-hide-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelHideButtonClick"
      />
      <ContentButton
        label="Delete"
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
