import {
  getStorageSync,
  setStorageSync,
  STORAGE_KEYS,
} from "src/utils/storage";
import { proxy, subscribe } from "valtio";

export const categoryStore = proxy<ICategoryFind[]>(
  getStorageSync(STORAGE_KEYS.category) || []
);
subscribe(categoryStore, () => {
  setStorageSync(STORAGE_KEYS.category, categoryStore);
});

export const actionsCategoryStore = {
  initCategoryStore(data: ICategoryFind[]) {
    debugger;
    categoryStore.length = 0;
    categoryStore.push(...data);
  },
};
