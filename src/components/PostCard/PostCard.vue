<script setup lang="ts">
import { useDark } from '@vueuse/core';
import type { Post } from '@/views/HomeView.vue';
import MapBox from '../MapBox.vue';
import CardButton from './CardButton.vue';
import bikeSVG from './icons/bike.svg';
import favoriteSVG from './icons/favorite.svg';
import commentSVG from './icons/comment.svg';
import publicSVG from './icons/public.svg';
import privateSVG from './icons/private.svg';
import moreSVG from './icons/more.svg';

const CARD_BUTTONS_EVENT = [
  {
    label: 'Going',
    imageUrl: bikeSVG,
  },
  {
    label: 'Comment',
    imageUrl: commentSVG,
  },
];

const CARD_BUTTONS_ROUTE = [
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

const buttons =
  postData.type === 'Event' ? CARD_BUTTONS_EVENT : CARD_BUTTONS_ROUTE;
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-left">
        <img class="avatar" :src="postData.authorAvatar" alt="avatar" />
        <div clas="host">
          <div class="author">{{ postData.author }}</div>
          <div class="availability">
            {{ postData.availability === 'public' ? 'Public' : 'Private'
            }}<img
              class="availability-icon"
              :class="{ invert: isDark }"
              :src="postData.availability === 'public' ? publicSVG : privateSVG"
              alt="availability"
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
      <MapBox :id="postData.id" :coordinates="postData.coordinates" />
    </div>
    <div class="details">{{ postData.details }}</div>
    <div class="card-footer">
      <CardButton
        v-for="(button, index) in buttons"
        :imageUrl="button.imageUrl"
        :label="button.label"
        :buttonId="`card-button-${postData.id}-${index}-${button.label}`"
        :key="`card-buttons-${postData.id}-${index}-${button.label}`"
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
.availability {
  font-size: 12px;
  filter: opacity(0.7);
  display: flex;
}
.availability-icon {
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
