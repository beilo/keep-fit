import Taro from "@tarojs/taro";
import { apiWxLogin } from "src/apis/user";
import { actionsUserStore } from "src/stores/user";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      async success({ code, errMsg }) {
        if (code) {
          try {
            const {
              data: { data, message },
            } = await apiWxLogin(code);
            if (data) {
              actionsUserStore.initUserStore(data);
              actionsUserStore.setToken(data.token);
              resolve(data);
            }
            reject(new Error(message));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(errMsg));
        }
      },
    });
  });
};
