<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ROUTER_PATHS from '@/router/routerConfig';
import ContentButton from './ContentButton.vue';

const TEXTS = {
  email: 'Email',
  emailPlaceholder: 'email@mail.com',
  password: 'Password',
  passwordPlaceholder: 'YourPassword',
  signin: 'Sign in',
  noAccount: "Don't have an account?",
  signup: 'Sign up',
};

const router = useRouter();
const isDark = useDark();
const email = ref('');
const password = ref('');
const signupError = ref('');

const handleSubmit = async () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push(ROUTER_PATHS.home);
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
      <label for="email">{{ TEXTS.email }}</label>
      <input
        id="email"
        type="email"
        v-model="email"
        :placeholder="TEXTS.emailPlaceholder"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="container">
      <label for="password">{{ TEXTS.password }}</label>
      <input
        id="password"
        type="password"
        v-model="password"
        :placeholder="TEXTS.passwordPlaceholder"
        :class="{ invert: isDark }"
      />
    </div>

    <div class="alert" v-if="signupError">{{ signupError }}</div>
    <ContentButton
      :label="TEXTS.signin"
      :buttonId="`login-form-submit-button`"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
      @click="handleSubmit"
    />
    <div class="container">
      {{ TEXTS.noAccount }}
      <RouterLink :to="ROUTER_PATHS.signup" class="link">
        <ContentButton
          :label="TEXTS.signup"
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
