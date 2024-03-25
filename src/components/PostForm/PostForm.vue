<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import Datepicker from '@vuepic/vue-datepicker';
import ContentButton from '../ContentButton.vue';
import closeSvg from './icons/close.svg';
import { MAX_TITLE_LENGTH, ALERT_MESSAGES, TEXTS, LINKS } from './config';

const isDark = useDark();

const router = useRouter();
const selectedTitle = ref('');
const selectedDetails = ref('');
const selectedDate = ref('');
const selectedAvailability = ref('Public');

const isTitleValid = ref(false);
const titleAlertMessage = ref(ALERT_MESSAGES.noTitle);

const { mode, postType } = defineProps<{
  mode: string;
  postType: string;
}>();

const isKeyOfObject = (key: string, object: {}): key is keyof typeof object =>
  key in object;

const getTitle = (): string => {
  if (isKeyOfObject(postType, TEXTS)) {
    return TEXTS[postType][mode];
  }
  return '';
};

const getBackLink = () => {
  if (isKeyOfObject(postType, LINKS)) {
    return LINKS[postType];
  }
  return '/';
};

onMounted(() => {
  if (mode === 'edit') {
    selectedTitle.value = '';
    selectedDetails.value = '';
  }
});

watch(selectedTitle, () => {
  if (!selectedTitle.value.trim().length) {
    titleAlertMessage.value = ALERT_MESSAGES.noTitle;
    isTitleValid.value = false;
  } else if (selectedTitle.value.trim().length > MAX_TITLE_LENGTH) {
    titleAlertMessage.value = ALERT_MESSAGES.tooLongTitle;
    isTitleValid.value = false;
  } else {
    titleAlertMessage.value = '';
    isTitleValid.value = true;
  }
});

const handleSubmit = () => {
  console.log(selectedDate.value);
  router.push(getBackLink());
};
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <RouterLink :to="getBackLink()"
        ><img
          class="close-icon icon"
          :class="{ invert: isDark }"
          :src="closeSvg"
          alt="close icon"
      /></RouterLink>
      <div class="text-input-container">
        <h2>
          {{ getTitle() }}
        </h2>
        <label class="text-input-label" for="title">{{ TEXTS.title }}</label>
        <input
          class="title"
          type="text"
          placeholder="My title"
          id="title"
          v-model="selectedTitle"
          :class="{ invert: isDark }"
        />
        <div class="alert">
          {{ titleAlertMessage }}
        </div>
        <label class="text-input-label" for="details">{{
          TEXTS.details
        }}</label>
        <textarea
          class="details"
          type="text"
          placeholder="My details"
          id="details"
          v-model="selectedDetails"
          :class="{ invert: isDark }"
        >
        </textarea>
      </div>
    </header>

    <main>
      <h3>{{ TEXTS.datePick }}</h3>
      <Datepicker v-model="selectedDate" time-picker-inline />

      <h3>{{ TEXTS.visibilityPick }}</h3>
      <div class="radio-container">
        <input
          type="radio"
          id="public"
          value="Public"
          v-model="selectedAvailability"
          class="hidden-radio"
        />
        <label for="public">Public</label>
        <input
          type="radio"
          id="private"
          value="Private"
          v-model="selectedAvailability"
          class="hidden-radio"
        />
        <label for="private">Private</label>
      </div>

      <ContentButton
        :label="TEXTS.buttonLabel"
        :buttonId="`submit-button-${postType}-${mode}`"
        class="submit-btn"
        :class="isDark ? 'btn-dark' : 'btn-light'"
        @click="handleSubmit"
      />
    </main>
  </form>
</template>
<style scoped>
form {
  height: 100%;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 640px;
}

.close-icon {
  width: 22px;
  height: 22px;
}
input,
textarea {
  border: none;
  outline: none;
  background: none;
}

textarea {
  width: 100%;
  height: auto;
  resize: vertical;
  overflow: auto;
}

::placeholder {
  color: var(--color-placeholder);
}

input:focus {
  outline: none;
}

.invert {
  filter: invert(100%);
}

h2 {
  font-weight: bold;
}

.text-input-label {
  padding-top: 16px;
  color: var(--color-label);
}

.hidden-radio {
  display: none;
}

.hidden-radio + label {
  cursor: pointer;
  font-weight: normal;
}

.hidden-radio:checked + label {
  font-weight: bold;
}

.title {
  width: fit-content;
  font-size: 1.3rem;
  text-align: center;
}
.details {
  width: fit-content;
  font-size: 1rem;
  padding-bottom: 1rem;
  text-align: center;
}

h3 {
  font-size: 16px;
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
}

.radio-input:checked + .radio-label-image {
  filter: invert(100);
}

.radio-label {
  display: inline-block;
  cursor: pointer;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

.submit-btn {
  scale: 1;
  width: 100%;
  height: 2rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: var(--main-padding);
}

.btn-dark {
  background-color: var(--vt-c-orange);
}
.btn-light {
  background-color: var(--vt-c-yellow);
}

.text-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
