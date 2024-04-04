<script setup lang="ts">
import { ref } from 'vue';
import ContentButton from '@/components/ContentButton.vue';
import { useDark } from '@vueuse/core';
import useUserStore from '@/stores/userStore';
import moment from 'moment';
import useFireStore from '@/stores/fireStore/fireStore';
import AVATARS_PATHS from './config';
import sendSvg from './icons/send.svg';

const useUser = useUserStore();
const useFire = useFireStore();
const isDark = useDark();
const input = ref('');
const { postId } = defineProps<{
  postId: string;
}>();

const handleSubmit = async () => {
  const date = moment().format('YYYY-MM-DD');
  const time = moment().format('HH:mm');
  const setComment = async () => {
    if (input.value && useUser.userId) {
      useFire.setComment(postId, useUser.userId, date, time, input.value);
    }
  };
  setComment();
  input.value = '';
};
</script>

<template>
  <div class="comments-container">
    <div
      class="comment-line"
      v-for="(messageData, index) in useFire.postComments.filter(
        comment => comment.postId === postId,
      )"
      :key="`message-${index}-${postId}`"
    >
      <img
        :src="AVATARS_PATHS[messageData.avatar]"
        alt="Author avatar"
        class="avatar"
      />
      <div class="message-content">
        <div class="details">
          <p class="author">
            {{ messageData.name }} {{ messageData.lastName }}
          </p>
          <p>{{ messageData.date }} {{ messageData.time }}</p>
        </div>
        <p>{{ messageData.message }}</p>
      </div>
    </div>
    <div class="new-comment">
      <ContentButton
        :buttonId="`send-message-btn-${postId}`"
        class="btn send-btn"
        :label="''"
        :imageUrl="sendSvg"
        @click="handleSubmit()"
      />
      <label for="textarea"></label>
      <textarea
        id="textarea"
        v-model="input"
        placeholder="Message..."
        :class="{ invert: isDark }"
        class="textarea-input"
        @keydown.enter.exact.prevent="handleSubmit()"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.comments-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
}

.comment-line {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 97%;
  margin-top: 5px;
  overflow: hidden;
}

.avatar {
  width: 30px;
  height: 30px;
}

.message-content {
  margin: 0;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.details {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  & .author {
    font-weight: bold;
  }
}
.new-comment {
  display: flex;
  width: 97%;
}
.textarea-input {
  width: 100%;
  border: solid 1px var(--color-placeholder);
  outline: none;
  background: white;
  border-radius: 5px;
  resize: vertical;
  font-size: 1rem;
  text-align: left;
  height: 30px;
}
.send-btn {
  width: 30px;
  height: 30px;
}
.invert {
  filter: invert(100%);
}

::placeholder {
  color: var(--color-placeholder);
}
</style>
@/stores/fireStore/fireStore
