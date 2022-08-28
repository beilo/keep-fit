import { Button, Notify, Toast } from "@antmjs/vantui";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { apiWxLogin } from "src/apis/user";
import { ROUTE_PATHS } from "src/router";
import { userStore } from "src/stores";
import { ledgerStore } from "src/stores/ledger";
import { actionsUserStore } from "src/stores/user";
import { redirectTo } from "src/utils/navigate";
import { hideLoading, loading, toast } from "src/utils/toast";
import { getToken } from "src/utils/wx";
import { useSnapshot } from "valtio";

export default function Home() {
  const snap = useSnapshot(userStore);
  const jump = () => {
    if (ledgerStore.currentLedger) {
      redirectTo({ url: ROUTE_PATHS.aa });
    } else {
      redirectTo({ url: ROUTE_PATHS["ledger-list"] });
    }
  };
  useEffect(() => {
    void (async function () {
      try {
        loading();
        await getToken();
        hideLoading();
        jump();
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      {!snap.userId ? <Button>重新尝试登录</Button> : null}
      <Toast />
      <Notify />
    </>
  );
}
