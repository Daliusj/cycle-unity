<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      router.push('/login');
    })
    .catch(error => {
      console.log(error);
    });
};
</script>

<template>
  <button type="button" @click="toggleDark()">
    {{ isDark ? 'Dark' : 'Light' }}
  </button>
  <button type="button" @click="handleSignOut()">Sign Out</button>
</template>

<style scoped></style>
