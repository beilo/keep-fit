import { Toast } from "@antmjs/vantui";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { apiWxLogin } from "src/apis/user";
import { ROUTE_PATHS } from "src/router";
import { redirectTo } from "src/utils/navigate";
import { STORAGE_KEYS } from "src/utils/storage";

export default function Home() {
  const jump = () => {
    if (Taro.getStorageSync(STORAGE_KEYS.ledgerId)) {
      redirectTo({ url: ROUTE_PATHS.aa });
    } else {
      redirectTo({ url: ROUTE_PATHS["ledger-list"] });
    }
  };
  useEffect(() => {
    jump();
    const openId = Taro.getStorageSync(STORAGE_KEYS.openId);
    if (openId) {
      jump();
    } else {
      Taro.login({
        async success({ code, errMsg }) {
          if (code) {
            //发起网络请求
            try {
              Toast.loading("登录中...");
              const res = await apiWxLogin(code);
              Toast.clear();
              if (res.data.data) {
                console.log("apiWxLogin", res.data.data);
                jump();
                return;
              }
              throw new Error(res.data.message);
            } catch (error) {
              Toast.fail(error.message);
            }
          } else {
            Toast.fail(errMsg);
          }
        },
      });
    }
  }, []);

  return null;
}
