import { defineStore } from 'pinia';

type FocusedElements = Record<string, boolean>;

const useHoverStore = defineStore('isFocused', {
  state: () => ({
    focusedElemets: {} as FocusedElements,
  }),
  actions: {
    focusIn(id: string) {
      this.focusedElemets[id] = true;
    },
    focusOut(id: string) {
      this.focusedElemets[id] = false;
    },
    isFocused(id: string) {
      return this.focusedElemets[id] || false;
    },
  },
});

export default useHoverStore;
