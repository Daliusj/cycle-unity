import { defineStore } from 'pinia';

const useWindowStore = defineStore('windowWidth', {
  state: () => ({
    windowWidth: window.innerWidth,
  }),
  actions: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    addResizeListener() {
      window.addEventListener('resize', this.handleResize);
    },
    handleScroll(event: WheelEvent) {
      const scrollableElement = document.querySelector('main');
      if (scrollableElement) {
        event.preventDefault();
        const scaleFactor = 0.5;
        scrollableElement.scrollBy(0, event.deltaY * scaleFactor);
      }
    },
    addScrollListener() {
      window.addEventListener('wheel', this.handleScroll, { passive: false });
    },
  },
});

export default useWindowStore;
