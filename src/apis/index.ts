import axios from "axios";
import { TaroAdapter } from "axios-taro-adapter";

const API_URL = "https://api.xxxx.com/";
export const Http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  adapter: TaroAdapter, // add this line，添加这一行使用taroAdapter
});

export { AxiosPromise } from "axios";
