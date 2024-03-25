<script setup lang="ts">
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
  <button type="button" @click="toggleDark()">
    <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
    {{ isDark ? 'Dark' : 'Light' }}
  </button>
</template>

<style scoped></style>
