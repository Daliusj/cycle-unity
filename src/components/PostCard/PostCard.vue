<script setup lang="ts">
import { useDark } from '@vueuse/core';
import type { Post } from '@/stores/fireStore';
import ContentButton from '@/components/ContentButton.vue';
import useFireStore from '@/stores/fireStore';
import MapBox from '../MapBox/MapBox.vue';
import bikeSVG from './icons/bike.svg';
import favoriteSVG from './icons/favorite.svg';
import commentSVG from './icons/comment.svg';
import publicSVG from './icons/public.svg';
import privateSVG from './icons/private.svg';
import PopUpMenu from './PopUpMenu.vue';

const isDark = useDark();
const useFire = useFireStore();
const { postData } = defineProps<{
  postData: Post;
}>();

const handleGoingClick = () => {
  useFire.setEventToGoing(postData.id);
};
const handleSaveClick = () => {
  useFire.setRouteToSaved(postData.id);
};
const handleCommentClick = () => {};
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-left">
        <img class="avatar" :src="postData.authorAvatar" alt="avatar" />
        <div clas="host">
          <div class="author">{{ postData.author }}</div>
          <div class="visibility">
            {{ postData.visibility === 'public' ? 'Public' : 'Private'
            }}<img
              class="visibility-icon"
              :class="{ invert: isDark }"
              :src="postData.visibility === 'public' ? publicSVG : privateSVG"
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
    <div class="date" v-show="postData.type === 'Event'">
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
        :imageUrl="bikeSVG"
        label="Going"
        :buttonId="`card-button-${postData.id}-going`"
        :key="`card-button-${postData.id}-going`"
        @click="handleGoingClick"
        v-show="postData.type === 'Event'"
      />
      <ContentButton
        :imageUrl="favoriteSVG"
        label="Save"
        :buttonId="`card-button-${postData.id}-save`"
        :key="`card-button-${postData.id}-save`"
        @click="handleSaveClick"
        v-show="postData.type === 'Route'"
      />
      <ContentButton
        :imageUrl="commentSVG"
        label="Comment"
        :buttonId="`card-button-${postData.id}-comment`"
        :key="`card-button-${postData.id}-comment`"
        @click="handleCommentClick"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: var(--main-padding);
  position: relative;
  width: 100%;
  max-height: calc(100vh - var(--header-height) - var(--footer-height));
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
}

.invert {
  filter: invert();
}
</style>
