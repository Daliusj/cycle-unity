<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useFireStore from '@/stores/fireStore/fireStore';
import ROUTER_PATHS from '@/router/routerConfig';
import ContentButton from './ContentButton.vue';

const TEXTS = {
  invalidEmail: 'Invalid Email',
  weekPassword: 'Week password',
  noMatch: 'Passwords do not match',
  defaultName: 'Cyclist',
  defaultSurname: 'Wheel',
  email: 'Email',
  emailPlaceholder: 'email@mail.com',
  password: 'Password',
  passwordPlaceholder: 'YourPassword',
  confirmPassword: 'Confirm Password',

  signin: 'Sign in',
  haveAccount: 'Have an account?',
  signup: 'Sign up',
};
const AVATARS = [
  'cyclistOne',
  'cyclistTwo',
  'cyclistThree',
  'cyclistFour',
  'cyclistFive',
];
const EMAIL_REGEX_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const router = useRouter();
const isDark = useDark();
const useFire = useFireStore();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupError = ref('');

const isValidEmail = computed(() => {
  return EMAIL_REGEX_PATTERN.test(email.value);
});
const isValidPassword = computed(() => {
  return password.value.length >= 6;
});
const doPasswordsMatch = computed(() => {
  return password.value === confirmPassword.value;
});

const isInputsValid = () => {
  if (!isValidEmail.value) {
    signupError.value = TEXTS.invalidEmail;
    return false;
  }
  if (!isValidPassword.value) {
    signupError.value = TEXTS.weekPassword;
    return false;
  }
  if (!doPasswordsMatch.value) {
    signupError.value = TEXTS.noMatch;
    return false;
  }
  return true;
};

const handleSubmit = () => {
  if (!isInputsValid()) return;
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      const { user } = userCredential;
      const name = `${TEXTS.defaultName}${Math.floor(1000 + Math.random() * 9000)}`;
      const lastName = `${TEXTS.defaultSurname}`;
      const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
      useFire.setUserContent(user.uid);
      useFire.setUserDetails(user.uid, avatar, name, lastName);
      router.push(ROUTER_PATHS.profile);
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
        @keyup.enter="handleSubmit"
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
        @keyup.enter="handleSubmit"
      />
    </div>

    <div class="container">
      <label for="confirmPassword">{{ TEXTS.confirmPassword }}</label>
      <input
        id="confirmPassword"
        type="password"
        v-model="confirmPassword"
        :placeholder="TEXTS.passwordPlaceholder"
        :class="{ invert: isDark }"
        @keyup.enter="handleSubmit"
      />
    </div>

    <div class="alert" v-if="signupError">{{ signupError }}</div>

    <ContentButton
      :label="TEXTS.signup"
      :buttonId="`signup-form-submit-button`"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
      @click="handleSubmit"
    />
    <div class="container">
      {{ TEXTS.haveAccount }}
      <RouterLink to="/login" class="link">
        <ContentButton
          :label="TEXTS.signin"
          :buttonId="`signup-form-link-button`"
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
@/stores/fireStore/fireStore
