<script setup lang="ts">
import { ref } from 'vue';
import ContentButton from '@/components/ContentButton.vue';
import addSvg from './icons/create.svg';

const { buttonLabel, radioOptions } = defineProps<{
  buttonLabel: string;
  radioOptions: { label: string; value: string }[];
}>();

const selectedOption = ref('all');

const emit = defineEmits({
  addClick: (value: boolean) => value,
  optionSelect: (value: string) => value,
});

const selectOption = (value: string) => {
  selectedOption.value = value;
  emit('optionSelect', value);
};
</script>
<template>
  <div class="content-menu">
    <ContentButton
      :imageUrl="addSvg"
      :label="buttonLabel"
      :buttonId="`Content-menu-button-${buttonLabel}`"
      :key="`Content-menu-button-${buttonLabel}`"
      @click="emit('addClick', true)"
    />
    <div class="filter">
      <div
        v-for="option in radioOptions"
        :key="option.value"
        class="radio-option"
        tabindex="0"
        @keyup.enter="selectOption(option.value)"
      >
        <input
          type="radio"
          :id="option.value"
          :value="option.value"
          v-model="selectedOption"
          class="hidden-radio"
          @change="emit('optionSelect', option.value)"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content-menu {
  display: flex;
  justify-content: space-between;
  padding: var(--main-padding);
}
.filter {
  width: 50vw;
  display: flex;
  justify-content: space-around;
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
</style>
