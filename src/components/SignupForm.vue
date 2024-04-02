<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const isDark = useDark();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupError = ref('');

const handleSubmit = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      const { user } = userCredential;
      console.log(user);
      router.push('/');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="input-container">
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        v-model="username"
        placeholder="Choose a username"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="input-container">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Your email"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="input-container">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Create a password"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="input-container">
      <label for="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm your password"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="alert" v-if="signupError">{{ signupError }}</div>

    <button
      type="submit"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
    >
      Sign Up
    </button>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 640px;
}

.input-container {
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
  color: var(--vt-c-red);
  text-align: center;
  width: 100%;
}
</style>
