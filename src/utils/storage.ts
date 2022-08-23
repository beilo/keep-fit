import Taro from "@tarojs/taro";

export const STORAGE_KEYS = {
  ledgerId: "ledgerId",
  openId: "openId",
  user: "user",
  ledgerStore: "ledgerStore",
};

type TStorageKeys = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
export const getStorageSync = (key: TStorageKeys, defaultValue = "") => {
  try {
    return Taro.getStorageSync(key) ?? defaultValue;
  } catch (error) {
    console.error("getStorageSync", error);
    return defaultValue;
  }
};

export const setStorageSync = (key: TStorageKeys, value) => {
  try {
    Taro.setStorageSync(key, value);
  } catch (error) {
    console.error("setStorageSync", error);
  }
};
