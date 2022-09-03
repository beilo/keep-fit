import { Button, Notify, Toast } from "@antmjs/vantui";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { categoryFind } from "src/apis/category";
import { apiWxLogin } from "src/apis/user";
import { ROUTE_PATHS } from "src/router";
import { userStore } from "src/stores";
import { actionsCategoryStore } from "src/stores/category";
import { ledgerStore } from "src/stores/ledger";
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
        apiCategoryFind();
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  const apiCategoryFind = async () => {
    const { data } = await categoryFind({});
    if (data?.code === 0) {
      actionsCategoryStore.initCategoryStore(data.data || []);
    }
  };

  return (
    <>
      {!snap.userId ? <Button>重新尝试登录</Button> : null}
      <Toast />
      <Notify />
    </>
  );
}
