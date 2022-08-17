import { Button, Cell, Dialog, Field, SwipeCell } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { ROUTE_PATHS } from "src/router";
import "./index.less";
import { setIsAdd, setLedgerName, useStore } from "./store";

export default function LedgerList() {
  const snap = useStore();
  useEffect(() => {}, []);

  const confirm = () => {
    console.log(snap.ledgerName);
    setIsAdd(false);
  };
  const jumpAA = (ledgerId: number) => {
    console.log(ledgerId);
    console.log(ROUTE_PATHS.aa);
    
    Taro.navigateTo({ url: `/${ROUTE_PATHS.aa }`});
  };
  return (
    <View className="ledger-list">
      <SwipeCell
        rightWidth={60}
        renderRight={<View className="del-btn">删除</View>}
      >
        <Cell
          className="mt-16"
          isLink
          title={"a账单"}
          onClick={() => {
            jumpAA(1);
          }}
        />
      </SwipeCell>
      <SwipeCell
        rightWidth={60}
        renderRight={<View className="del-btn">删除</View>}
      >
        <Cell className="mt-16" isLink title={"a账单"} />
      </SwipeCell>

      <View className="bottom-wrap">
        <Button
          type="default"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          生成账本
        </Button>
      </View>

      <Dialog
        id="vanDialog3"
        title="新增账本"
        showCancelButton
        showConfirmButton
        show={snap.isAdd}
        onClose={() => {
          setIsAdd(false);
        }}
        onConfirm={confirm}
      >
        <Field
          placeholder="请输入账本名称"
          value={snap.ledgerName}
          onChange={(e) => {
            setLedgerName(e.detail);
          }}
        />
      </Dialog>
    </View>
  );
}
