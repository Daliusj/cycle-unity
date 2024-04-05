<script setup lang="ts">
import NavMenu from '@/components/NavMenu/NavMenu.vue';
import { useDark } from '@vueuse/core';

const LOGO_TEXT = 'Cycle Unity';
const LOGO_TEXT_SHORT = 'C';

const isDark = useDark();
const { showLabels, fullWidth } = defineProps<{
  showLabels: boolean;
  fullWidth: boolean;
}>();
</script>

<template>
  <div
    class="side-bar"
    :class="[
      isDark ? 'side-bar-dark' : 'side-bar-light',
      fullWidth ? 'side-bar-max-width' : 'side-bar-min-width',
    ]"
  >
    <div class="logo" :class="{ 'logo-short': !fullWidth }">
      {{ fullWidth ? LOGO_TEXT : LOGO_TEXT_SHORT }}
    </div>
    <NavMenu
      :vertical="true"
      :show-labels="showLabels"
      class="nav-menu"
      :class="fullWidth ? 'margin-right' : 'no-margin'"
    />
  </div>
</template>

<style scoped>
.side-bar-max-width {
  width: 200px;
}
.side-bar-min-width {
  margin-top: 112;
  width: 80px;
}
.side-bar {
  position: absolute;
  left: 0;
  height: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-menu {
  max-width: 120px;
}

.no-margin {
  margin-right: 0;
}
.margin-right {
  margin-right: 40px;
}

.logo {
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0 30px 0;
  color: var(--vt-c-yellow);
}

.logo-short {
  font-size: 40px;
}
</style>
