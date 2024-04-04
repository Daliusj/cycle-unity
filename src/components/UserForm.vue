<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import useUserStore from '@/stores/userStore';
import useFireStore from '@/stores/fireStore/fireStore';
import ContentButton from './ContentButton.vue';

const isDark = useDark();
const router = useRouter();
const useFire = useFireStore();
const useUser = useUserStore();
const name = ref('');
const isNameValid = ref<boolean>();
const lastName = ref('');
const isLastNameValid = ref<boolean>();
const avatar = ref('avatarOne');

onMounted(() => {
  name.value = useFire.userDetails.name;
  lastName.value = useFire.userDetails.lastName;
  avatar.value = useFire.userDetails.avatar;
});

watch(name, () => {
  isNameValid.value = !!name.value;
});
watch(lastName, () => {
  isLastNameValid.value = !!lastName.value;
});

const handleSubmit = async () => {
  if (useUser.userId && isNameValid.value && isLastNameValid.value) {
    useFire.setUserDetails(
      useUser.userId,
      avatar.value,
      name.value,
      lastName.value,
    );
    useFire.fetchEvents();
    useFire.fetchRoutes();
    useFire.fetchUserContent();
    useFire.fetchUserDetails();
    router.push('/');
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="container">
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        v-model="name"
        placeholder="Name"
        :class="{ invert: isDark }"
      />
    </div>
    <div v-show="!isNameValid" class="alert">Invalid Name</div>

    <div class="container">
      <label for="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        v-model="lastName"
        placeholder="Rider"
        :class="{ invert: isDark }"
      />
    </div>
    <div v-show="!isLastNameValid" class="alert">Invalid Last Name</div>

    <ContentButton
      :label="'Submit'"
      :buttonId="`profile-form-submit-button`"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
      @click="handleSubmit"
    />
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
.link {
  text-decoration: none;
}
</style>
@/stores/fireStore/fireStore
