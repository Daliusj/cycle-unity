import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const USER_ID = '123456';
type UserState = {
  userId: string | null;
};

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
  }),
  actions: {
    setUser(userId: string) {
      this.userId = userId;
    },
    clearUser() {
      this.userId = null;
    },
    monitorAuthState() {
      onAuthStateChanged(auth, user => {
        if (user) {
          this.setUser(user.uid);
        } else {
          this.clearUser();
        }
      });
    },
  },
});

export default useUserStore;
