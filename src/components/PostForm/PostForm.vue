<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import Datepicker from '@vuepic/vue-datepicker';
import type { LatLngTuple, LatLng } from 'leaflet';
import moment from 'moment';
import useFireStore from '@/stores/fireStore/fireStore';
import ContentButton from '../ContentButton.vue';
import closeSvg from './icons/close.svg';
import MapBox from '../MapBox/MapBox.vue';
import { MAX_TITLE_LENGTH, ALERT_MESSAGES, TEXTS, LINKS } from './config';
import useUserStore from '../../stores/userStore';

const DEFAULT_COORDS: LatLngTuple = [54.8985, 23.9036];

const useUser = useUserStore();
const useFire = useFireStore();
const isDark = useDark();
const router = useRouter();
const selectedTitle = ref('');
const selectedDetails = ref('');
const selectedDate = ref('');
const selectedVisibility = ref('public');
const selectedCoords = ref<LatLngTuple>(DEFAULT_COORDS);
const selectedGpxData = ref<string | null>();
const fileName = ref<string>('');
const { mode, postType } = defineProps<{
  mode: string;
  postType: string;
}>();
const isFileUploaded = ref<boolean>(postType === 'event');
const isDateSelected = ref<boolean>(postType === 'route');
const isLocationPicked = ref<boolean>(postType === 'route');
const isTitleValid = ref(false);
const titleAlertMessage = ref(ALERT_MESSAGES.noTitle);

watch(selectedGpxData, () => {
  if (postType === 'route') isFileUploaded.value = !!selectedGpxData.value;
});

watch(selectedDate, () => {
  if (postType === 'event') isDateSelected.value = !!selectedDate.value;
});

watch(selectedCoords, () => {
  if (postType === 'event') isLocationPicked.value = !!selectedCoords.value;
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

const getVisibilityButtonClass = (value: string, showDark: boolean) => {
  if (selectedVisibility.value === value) {
    return showDark ? 'btn-dark' : 'btn-light';
  }
  return showDark ? 'btn-clear-dark' : 'btn-clear-light';
};

const publicButtonClass = computed(() =>
  getVisibilityButtonClass('public', isDark.value),
);
const privateButtonClass = computed(() =>
  getVisibilityButtonClass('private', isDark.value),
);

const isKeyOfObject = (key: string, object: {}): key is keyof typeof object =>
  key in object;

const getTitle = (): string => {
  if (isKeyOfObject(postType, TEXTS)) {
    return TEXTS[postType][mode];
  }
  return '';
};

const getEscapeLink = () => {
  if (isKeyOfObject(postType, LINKS)) {
    return LINKS[postType];
  }
  return '/';
};

onBeforeMount(() => {
  if (mode === 'edit') {
    selectedTitle.value = useFire.postToEdit.title;
    selectedDetails.value = useFire.postToEdit.details;
    selectedDate.value = `${useFire.postToEdit.date}T${useFire.postToEdit.time}`;
    selectedVisibility.value = useFire.postToEdit.visibility.toLowerCase();
    selectedCoords.value =
      useFire.postToEdit.startCoordinates || DEFAULT_COORDS;
    selectedGpxData.value = useFire.postToEdit.gpxData;
    fileName.value = useFire.postToEdit.gpxFileName || 'route.gpx';
  }
});

const setCoords = (coords: LatLng): void => {
  selectedCoords.value = [coords.lat, coords.lng];
};

const handleGpxUpload = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  fileName.value = input.value.split('\\').pop() || 'Something wrong';
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    selectedGpxData.value = e.target?.result as string;
  };
  reader.onerror = () => {
    console.error('Error reading the GPX file.');
  };
  reader.readAsText(file);
};

const handleSubmit = async () => {
  if (
    isTitleValid.value &&
    isDateSelected.value &&
    isFileUploaded.value &&
    isLocationPicked.value &&
    useUser.userId
  ) {
    await useFire.setPost({
      id: useFire.postToEdit.id || '',
      type: postType,
      userId: useUser.userId,
      visibility: selectedVisibility.value,
      title: selectedTitle.value,
      details: selectedDetails.value,
      date:
        postType === 'event'
          ? moment(selectedDate.value).format('YYYY-MM-DD')
          : '',
      time:
        postType === 'event' ? moment(selectedDate.value).format('HH:mm') : '',
      location: selectedCoords.value as LatLngTuple,
      gpxData: selectedGpxData.value || null,
      gpxId: useFire.postToEdit.gpxId,
      gpxFileName: fileName.value,
    });
    router.push(getEscapeLink());
  }
};
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div class="close-container">
      <RouterLink :to="getEscapeLink()"
        ><img
          class="close-icon icon"
          :class="{ invert: isDark }"
          :src="closeSvg"
          alt="close icon"
      /></RouterLink>
    </div>

    <h2>
      {{ getTitle() }}
    </h2>
    <label for="title">{{ TEXTS.title }}</label>
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
    <label for="details">{{ TEXTS.details }}</label>
    <textarea
      class="details"
      type="text"
      placeholder="My details"
      id="details"
      v-model="selectedDetails"
      :class="{ invert: isDark }"
    >
    </textarea>

    <label v-show="postType === 'event'" for="date-picker">{{
      TEXTS.datePick
    }}</label>
    <Datepicker
      v-show="postType === 'event'"
      id="date-picker"
      v-model="selectedDate"
      time-picker-inline
      class="date-picker"
      :class="{ invert: isDark }"
    />
    <div class="alert">
      {{ !isDateSelected ? ALERT_MESSAGES.selectDate : '' }}
    </div>

    <label for="visibility-radio">{{ TEXTS.visibilityPick }}</label>
    <div class="radio-container" id="visibility-radio">
      <input
        type="radio"
        id="public"
        value="public"
        v-model="selectedVisibility"
        class="hidden-radio"
      />
      <label for="public">
        <ContentButton
          label="Public"
          :buttonId="`public-button-${postType}-${mode}`"
          class="btn"
          :class="publicButtonClass"
        />
      </label>
      <input
        type="radio"
        id="private"
        value="private"
        v-model="selectedVisibility"
        class="hidden-radio"
      />
      <label for="private">
        <ContentButton
          label="Private"
          :buttonId="`private-button-${postType}-${mode}`"
          class="btn"
          :class="privateButtonClass"
        />
      </label>
    </div>

    <label for="gpx-upload" class="upload-label">
      <ContentButton
        :label="selectedGpxData ? fileName : TEXTS.uploadGpx"
        :buttonId="`upload-button-${postType}-${mode}`"
        class="btn extra-margin"
        :class="isDark ? 'btn-dark' : 'btn-light'"
      />
      <div class="alert">
        {{ !isFileUploaded ? ALERT_MESSAGES.uploadGpx : '' }}
      </div>
    </label>
    <input
      type="file"
      @change="handleGpxUpload"
      id="gpx-upload"
      accept=".gpx"
      class="file-upload"
    />

    <label v-show="postType === 'event'" for="map">{{ TEXTS.mapPick }}</label>
    <div v-show="postType === 'event'" class="map" id="map">
      <MapBox
        :id="`mapbox-${postType}-${mode}`"
        :start-coordinates="selectedCoords"
        :pickerMode="true"
        @set-coords="setCoords"
      />
    </div>
    <div class="alert">
      {{ !isLocationPicked ? ALERT_MESSAGES.selectLocation : '' }}
    </div>
    <ContentButton
      :label="TEXTS.buttonLabel"
      :buttonId="`submit-button-${postType}-${mode}`"
      class="btn extra-margin"
      :class="isDark ? 'btn-dark' : 'btn-light'"
      @click="handleSubmit"
    />
  </form>
</template>
<style scoped>
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 640px;
}
label {
  width: 100%;
  padding-top: 16px;
  color: var(--color-label);
}

.upload-label {
  padding: 0;
}

.close-icon {
  width: 22px;
  height: 22px;
}
input,
textarea {
  min-width: 100%;
  border: solid 1px var(--color-placeholder);
  outline: none;
  background: white;
  border-radius: 5px;
  resize: vertical;
  font-size: 1rem;
  text-align: left;
}

::placeholder {
  color: var(--color-placeholder);
}

.close-container {
  width: 100%;
}

.date-picker {
  z-index: 1;
  border: solid 1px var(--color-placeholder);
  border-radius: 5px;
}

.invert {
  filter: invert(100%);
}

.file-upload {
  display: none;
}

h2 {
  font-weight: bold;
}

.hidden-radio {
  display: none;
}

.title {
  text-align: left;
  height: 2rem;
}
.details {
  min-height: 6rem;
}

.radio-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

.btn-clear-dark {
  background-color: black;
  border: 1px solid var(--vt-c-orange);
}
.btn-clear-light {
  background-color: white;
  border: 1px solid var(--vt-c-yellow);
}

.map {
  width: 100%;
  z-index: 0;
}

.alert {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
@/stores/fireStore/fireStore
