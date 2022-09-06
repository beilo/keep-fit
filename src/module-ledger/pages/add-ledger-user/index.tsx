import { Button, CellGroup, Field, Notify, Toast } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getLedgerJoin } from "src/apis/ledger";
import { navigateBack } from "src/utils/navigate";
import { hideLoading, loading, toast } from "src/utils/toast";
import "./index.less";

export default function AddNewLedger() {
  const [ledgerCode, setLedgerCode] = useState("");

  useEffect(() => {
    Taro.getClipboardData({
      success(res) {
        setLedgerCode(res.data);
      },
    });
  }, []);

  const apiAddLedgerUser = async () => {
    try {
      loading();
      const res = await getLedgerJoin(ledgerCode);
      hideLoading();
      if (res.data.code === 0) {
        toast.success("添加成功");
        navigateBack({ delta: 1 });
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <View className="add-ledger-user">
      <CellGroup>
        <Field
          label="请输入账本id"
          value={ledgerCode}
          onChange={(event) => {
            setLedgerCode(event.detail);
          }}
        />
      </CellGroup>
      <View className="add-btn-wrap">
        <Button type="primary" onClick={apiAddLedgerUser}>
          加入新账本
        </Button>
      </View>
      <Toast />
      <Notify />
    </View>
  );
}
