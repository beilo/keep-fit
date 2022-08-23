import {
  getStorageSync,
  setStorageSync,
  STORAGE_KEYS,
} from "src/utils/storage";
import { proxy, subscribe } from "valtio";
class UserStore implements IUser {
  userId: number;
  userName: string;
  email: string | null;
  phone: string | null;
  token: string;
}

export const userStore = proxy(
  (getStorageSync(STORAGE_KEYS.user) as UserStore) || new UserStore()
);
subscribe(userStore, () => {
  setStorageSync(STORAGE_KEYS.user, userStore);
});

export const actionsUserStore = {
  initUserStore(data: IUser) {
    userStore.userId = data.userId;
    userStore.userName = data.userName;
    userStore.phone = data.phone;
    userStore.email = data.email;
    userStore.token = data.token;
  },
};
