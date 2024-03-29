import { defineStore } from 'pinia';

const USER_ID = '123456';
type UserState = {
  userId: string;
};

const useUserStore = defineStore('currentUserId', {
  state: (): UserState => ({
    userId: USER_ID,
  }),
  actions: {
    getUserId() {
      this.userId = USER_ID;
    },
  },
});

export default useUserStore;
