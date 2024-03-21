<script setup lang="ts">
import useHoverStore from '@/stores/hoverStore';
import { RouterLink } from 'vue-router';

const FOCUS_OUT_TIME = 300;

const useHover = useHoverStore();
const { imageUrl, label, route, showTitle } = defineProps<{
  imageUrl: string;
  label: string;
  route: string;
  showTitle: boolean;
}>();
const buttonId = `route-button--${label}`;

const handleClick = (id: string): void => {
  setTimeout(() => {
    useHover.focusOut(id);
  }, FOCUS_OUT_TIME);
};
</script>

<template>
  <RouterLink
    :to="route"
    class="nav-item focusable"
    :class="{ focus: useHover.isFocused(buttonId) }"
    @mouseover="useHover.focusIn(buttonId)"
    @focusin="useHover.focusIn(buttonId)"
    @mouseleave="useHover.focusOut(buttonId)"
    @focusout="useHover.focusOut(buttonId)"
    @click="handleClick(buttonId)"
  >
    <img :src="imageUrl" alt="label" class="icon" />
    <div v-show="showTitle" class="label">{{ label }}</div>
  </RouterLink>
</template>
<style scoped>
.icon {
  width: 32px;
  height: 32px;
  margin: 0 auto;
}

.label {
  font-size: 16px;
  margin-top: 5px;
}

.nav-item {
  display: flex;
  text-align: center;
  flex-grow: 1;
  text-decoration: none;
  color: black;
}
</style>
