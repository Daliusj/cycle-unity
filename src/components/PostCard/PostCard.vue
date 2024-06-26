<script setup lang="ts">
import { useDark } from '@vueuse/core';
import ContentButton from '@/components/ContentButton.vue';
import { computed, ref } from 'vue';
import type { Post } from '@/stores/fireStore/types';
import useFireStore from '@/stores/fireStore/fireStore';
import {
  POST_VISIBILITY_ID_PUBLIC,
  EVENT_ID,
  ROUTE_ID,
} from '@/stores/fireStore/fireStoreConfig';
import MapBox from '../MapBox/MapBox.vue';
import goingSVG from './icons/bike.svg';
import notGoingSvg from './icons/not-going.svg';
import favoriteSVG from './icons/favorite.svg';
import commentSVG from './icons/comment.svg';
import publicSVG from './icons/public.svg';
import privateSVG from './icons/private.svg';
import notFavoriteSvg from './icons/not-favorite.svg';
import PopUpMenu from './PopUpMenu.vue';
import AVATARS_PATHS from './config';
import PostComments from './PostComments.vue';

const TEXTS = {
  public: 'Public',
  private: 'Private',
  declineEvent: 'Decline Event',
  joinEvent: 'Join event',
  save: 'Save',
  remove: 'Remove',
  hide: 'Hide comments',
  show: 'Show comments',
};

const isCommentsToggled = ref<boolean>(false);
const isDark = useDark();
const useFire = useFireStore();
const { postData } = defineProps<{
  postData: Post;
}>();

const emit = defineEmits({
  goingClick: (value: boolean) => value,
});

const isEventSetGoing = computed(() =>
  useFire.userEventsGoing.includes(postData.id),
);
const isRouteSaved = computed(() =>
  useFire.userSavedRoutes.includes(postData.id),
);

const handleGoingClick = () => {
  if (isEventSetGoing.value) useFire.removeEventFromGoing(postData.id);
  else {
    useFire.setEventToGoing(postData.id);
  }
  emit('goingClick', true);
};
const handleSaveClick = () => {
  if (isRouteSaved.value) useFire.removeRouteFromSaved(postData.id);
  else {
    useFire.setRouteToSaved(postData.id);
  }
  emit('goingClick', true);
};
const handleCommentClick = () => {
  isCommentsToggled.value = !isCommentsToggled.value;
};
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-left">
        <img
          class="avatar"
          :src="AVATARS_PATHS[postData.authorAvatar]"
          alt="avatar"
        />
        <div clas="host">
          <div class="author">{{ postData.author }}</div>
          <div class="visibility">
            {{
              postData.visibility === POST_VISIBILITY_ID_PUBLIC
                ? TEXTS.public
                : TEXTS.private
            }}<img
              class="visibility-icon"
              :class="{ invert: isDark }"
              :src="
                postData.visibility === POST_VISIBILITY_ID_PUBLIC
                  ? publicSVG
                  : privateSVG
              "
              alt="visibility"
            />
          </div>
        </div>
      </div>
      <PopUpMenu
        :id="postData.id"
        :postType="postData.type"
        :author-id="postData.authorId"
        :gpx-id="postData.gpxId"
        :gpx-data="postData.gpxData"
        :gpx-file-name="postData.gpxFileName"
      />
    </div>
    <div class="title">
      {{ `${postData.type}: ${postData.title}` }}
    </div>
    <div class="date" v-show="postData.type === EVENT_ID">
      {{ `${postData.date} ${postData.time}` }}
    </div>
    <div class="map">
      <MapBox
        :id="postData.id"
        :start-coordinates="postData.startCoordinates"
        :gpxData="postData.gpxData"
      />
    </div>
    <div class="details">{{ postData.details }}</div>
    <div class="card-footer">
      <ContentButton
        :imageUrl="isEventSetGoing ? notGoingSvg : goingSVG"
        :label="isEventSetGoing ? TEXTS.declineEvent : TEXTS.joinEvent"
        :buttonId="`card-button-${postData.id}-going`"
        :key="`card-button-${postData.id}-going`"
        @click="handleGoingClick"
        v-show="postData.type === EVENT_ID"
      />
      <ContentButton
        :imageUrl="isRouteSaved ? notFavoriteSvg : favoriteSVG"
        :label="isRouteSaved ? TEXTS.remove : TEXTS.save"
        :buttonId="`card-button-${postData.id}-save`"
        :key="`card-button-${postData.id}-save`"
        @click="handleSaveClick"
        v-show="postData.type === ROUTE_ID"
      />
      <ContentButton
        :imageUrl="commentSVG"
        :label="isCommentsToggled ? TEXTS.hide : TEXTS.show"
        :buttonId="`card-button-${postData.id}-comment`"
        :key="`card-button-${postData.id}-comment`"
        @click="handleCommentClick"
      />
    </div>
    <div>
      <PostComments
        v-show="isCommentsToggled"
        :postId="postData.id"
        :class="isDark ? 'borders-dark' : 'borders-light'"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: var(--main-padding);
  position: relative;
  width: 100%;
}

.card-header {
  width: 100%;
  padding: var(--card-padding);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .card-header-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  width: 40px;
  margin-right: 5px;
}

.author {
  font-weight: bold;
}
.visibility {
  font-size: 12px;
  filter: opacity(0.7);
  display: flex;
}
.visibility-icon {
  width: 16px;
  margin-left: 5px;
  filter: opacity(0.7);
}

.title {
  font-size: 20px;
}

.map {
  width: 100%;
  z-index: 0;
}
.details {
  width: 100%;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
}

.invert {
  filter: invert();
}

.borders-light {
  border-right: 0.5px solid black;
  border-left: 0.5px solid black;
}
.borders-dark {
  border-right: 0.5px solid white;
  border-left: 0.5px solid white;
}
</style>
@/stores/fireStore/fireStore@/stores/fireStore/fireStore
