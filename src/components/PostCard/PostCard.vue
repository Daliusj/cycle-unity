<script setup lang="ts">
import { useDark } from '@vueuse/core';
import type { Post } from '@/views/HomeView.vue';
import ContentButton from '@/components/ContentButton.vue';
import MapBox from '../MapBox/MapBox.vue';
import bikeSVG from './icons/bike.svg';
import favoriteSVG from './icons/favorite.svg';
import commentSVG from './icons/comment.svg';
import publicSVG from './icons/public.svg';
import privateSVG from './icons/private.svg';
import moreSVG from './icons/more.svg';

const BUTTONS_EVENT = [
  {
    label: 'Going',
    imageUrl: bikeSVG,
  },
  {
    label: 'Comment',
    imageUrl: commentSVG,
  },
];

const BUTTONS_ROUTE = [
  {
    label: 'Save',
    imageUrl: favoriteSVG,
  },
  {
    label: 'Comment',
    imageUrl: commentSVG,
  },
];

const isDark = useDark();

const { postData } = defineProps<{
  postData: Post;
}>();

const buttons = postData.type === 'Event' ? BUTTONS_EVENT : BUTTONS_ROUTE;

const handleClick = (buttonLabel: string): void => {
  console.log(`Cliked: ${postData.title}-${buttonLabel} `);
};
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
      <img
        class="more-icon"
        :class="{ invert: isDark }"
        :src="moreSVG"
        alt="more"
      />
    </div>
    <div class="title">
      {{ `${postData.type}: ${postData.title}` }}
    </div>
    <div class="map">
      <MapBox
        :id="postData.id"
        :start-coordinates="postData.startCoordinates"
        :gpxUrl="postData.gpxUrl"
      />
    </div>
    <div class="details">{{ postData.details }}</div>
    <div class="card-footer">
      <ContentButton
        v-for="(button, index) in buttons"
        :imageUrl="button.imageUrl"
        :label="button.label"
        :buttonId="`card-button-${postData.id}-${index}-${button.label}`"
        :key="`card-buttons-${postData.id}-${index}-${button.label}`"
        @click="handleClick(button.label)"
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

.more-icon {
  width: 24px;
}

.title {
  font-size: 20px;
}

.map {
  width: 100%;
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
