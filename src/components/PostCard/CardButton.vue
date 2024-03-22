<script setup lang="ts">
import { useDark } from '@vueuse/core';
import useHoverStore from '@/stores/hoverStore';

const FOCUS_OUT_TIME = 300;

const isDark = useDark();
const useHover = useHoverStore();
const { imageUrl, label, buttonId } = defineProps<{
  imageUrl: string;
  label: string;
  buttonId: string;
}>();

const handleClick = (id: string): void => {
  setTimeout(() => {
    useHover.focusOut(id);
  }, FOCUS_OUT_TIME);
};
</script>

<template>
  <div
    class="card-button focusable"
    :class="{ focus: useHover.isFocused(buttonId) }"
    @mouseover="useHover.focusIn(buttonId)"
    @focusin="useHover.focusIn(buttonId)"
    @mouseleave="useHover.focusOut(buttonId)"
    @focusout="useHover.focusOut(buttonId)"
    @click="handleClick(buttonId)"
    @keyup.enter="handleClick(buttonId)"
  >
    <img :src="imageUrl" alt="label" class="icon" :class="{ invert: isDark }" />
    <div class="label" :class="{ invert: isDark }">
      {{ label }}
    </div>
  </div>
</template>
<style scoped>
.icon {
  width: 24px;
  height: 24px;
  margin: 0 auto;
}

.invert {
  filter: invert();
}

.label {
  font-size: 14px;
}

.card-button {
  display: flex;
  text-align: center;

  gap: 5px;
  text-decoration: none;
  color: var(--color-text-light);
}
</style>
