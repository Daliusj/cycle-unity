<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { ref } from 'vue';
import ContentButton from '@/components/ContentButton.vue';
import { useRouter } from 'vue-router';
import moreSVG from './icons/more.svg';
import useUserStore from '../../stores/userStore';
import useFireStore from '../../stores/fireStore';

const router = useRouter();
const useFire = useFireStore();
const isMenuVisible = ref(false);
const isDark = useDark();
const { id, postType } = defineProps<{
  id: string;
  postType: string;
}>();
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handelEditButtonClick = () => {
  useFire.setPostToEdit(id);
  router.push(`/edit-${postType.toLowerCase()}`);
  toggleMenu();
};
const handelHideButtonClick = () => {
  console.log(id);

  toggleMenu();
};
const handelDeleteButtonClick = () => {
  console.log(id);

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
        label="Edit"
        :buttonId="`popup-menu-button-edit-${id}`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handelEditButtonClick"
      />
      <ContentButton
        label="Hide"
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
  width: 30%;
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
  width: 100%;
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
