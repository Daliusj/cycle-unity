<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const isDark = useDark();
const email = ref('');
const password = ref('');
const loginError = ref('');

const handleSubmit = async () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
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
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="email@mail.com"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="input-container">
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Your password"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="alert" v-if="loginError">{{ loginError }}</div>

    <button
      type="submit"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
    >
      Log in
    </button>
    <div>
      Don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
    </div>
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
