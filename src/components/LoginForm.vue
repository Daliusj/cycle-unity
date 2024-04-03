<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ContentButton from './ContentButton.vue';

const router = useRouter();
const isDark = useDark();
const email = ref('');
const password = ref('');
const signupError = ref('');

const handleSubmit = async () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push('/');
    })
    .catch(error => {
      const [, code] = error.code.split('/');
      signupError.value = code.split('-').join(' ');
    });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="container">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="email@mail.com"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="container">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Your password"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="alert" v-if="signupError">{{ signupError }}</div>
    <ContentButton
      :label="'Sign in'"
      :buttonId="`login-form-submit-button`"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
      @click="handleSubmit"
    />
    <div class="container">
      Don't have an account?
      <RouterLink to="/signup" class="link">
        <ContentButton
          :label="'Sign up'"
          :buttonId="`login-form-link-button`"
          class="btn"
          :class="isDark ? 'btn-dark' : 'btn-light'"
        />
      </RouterLink>
    </div>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  padding: var(--main-padding);
}

.container {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-label);
}

input {
  width: 100%;
  padding: 0.5rem;
  border: solid 1px var(--color-placeholder);
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
}

::placeholder {
  color: var(--color-placeholder);
}

.invert {
  filter: invert(100%);
}

.alert {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
}
.link {
  text-decoration: none;
}
</style>
