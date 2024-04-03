<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';
import UserForm from '@/components/UserForm.vue';
import ContentButton from '@/components/ContentButton.vue';

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
  <div class="profile">
    <div class="profile-header">
      <ContentButton
        :label="isDark ? 'Dark' : 'Light'"
        :buttonId="`profile-dark-mode-button`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="toggleDark()"
      />
      <ContentButton
        :label="'Sign Out'"
        :buttonId="`profile-signout-button`"
        class="btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handleSignOut()"
      />
    </div>
    <UserForm class="form" />
  </div>
</template>

<style scoped>
.profile {
  width: 100%;
  min-height: 100%;
  max-width: 450px;
}
.profile-header {
  display: flex;
  padding: var(--main-padding);
  justify-content: space-between;
  & .btn {
    width: 100px;
  }
}
.form {
  margin-top: 30%;
}
</style>
