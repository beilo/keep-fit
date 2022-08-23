import { Button, CellGroup, Field, Notify, Toast } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { addLedgerUser } from "src/apis/ledger";
import { userStore } from "src/stores";
import { hideLoading, loading, toast } from "src/utils/toast";
import "./index.less";

export default function AddNewLedger() {
  const [ledgerId, setLedgerId] = useState("");

  useEffect(() => {
    Taro.getClipboardData({
      success(res) {
        setLedgerId(res.data);
      },
    });
  }, []);

  const apiAddLedgerUser = async () => {
    try {
      loading();
      const res = await addLedgerUser(Number(ledgerId), userStore.userId);
      hideLoading();
      if (res.data.code === 0) {
        toast.success("添加成功");
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <CellGroup border className="add-ledger-user">
        <Field
          label="请输入账本id"
          value={ledgerId}
          onChange={(event) => {
            setLedgerId(event.detail);
          }}
        />
        <View className="add-btn-wrap">
          <Button type="primary" onClick={apiAddLedgerUser}>
            加入新账本
          </Button>
        </View>
      </CellGroup>
      <Toast />
      <Notify />
    </>
  );
}
