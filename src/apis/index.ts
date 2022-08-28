import { userStore } from "src/stores";
import axios from "axios";
import { TaroAdapter } from "axios-taro-adapter";
import { getToken } from "src/utils/wx";

console.log("CONFIG", CONFIG);
const API_URL = CONFIG.api.aaLedger;
export const Http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  adapter: TaroAdapter, // add this line，添加这一行使用taroAdapter
  headers: {
    "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
    "Content-Type": "application/json",
  },
});

// interceptors for request
Http.interceptors.request.use(
  function (config: any) {
    config.headers.token = userStore.token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// interceptors for response
Http.interceptors.response.use(
  function (response) {
    if (!response) {
      return Promise.reject(new Error("response为空，请检查网络"));
    }
    if (response.status === 401) {
      return getToken()
        .then((_) => Http(response.config))
        .catch((err) => Promise.reject(err));
    }
    if (!response.data) {
      return Promise.reject(new Error("response.data为空，服务器异常"));
    }
    if (typeof response.data.code !== "number") {
      return Promise.reject(new Error("code异常，服务器异常"));
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { AxiosPromise } from "axios";
