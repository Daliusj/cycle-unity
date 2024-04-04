import { defineStore } from 'pinia';

type ErrorState = {
  error: string | null;
};

const useErrorStore = defineStore('error', {
  state: (): ErrorState => ({
    error: null,
  }),
  actions: {
    setError(error: string) {
      this.error = error;
    },
    clearError() {
      this.error = null;
    },
  },
});

export default useErrorStore;
