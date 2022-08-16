import {
  Cell,
  CellGroup,
  Checkbox,
  Field,
  Stepper,
  Button,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Immutable, produce } from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ROUTE_PATHS } from "src/router";
import { Row, Col } from "@antmjs/vantui";
import "./index.less";
import { SwipeCell } from "@antmjs/vantui";
import { Dialog } from "@antmjs/vantui";
import { proxy, useSnapshot } from "valtio";
import { setIsAdd, useStore,setLedgerName,setLedgerList } from "./store";

export default function LedgerList() {
  const snap = useStore();
  useEffect(() => {}, []);

  return (
    <View className="ledger-list">
      <SwipeCell
        rightWidth={60}
        renderRight={<View className="del-btn">删除</View>}
      >
        <Cell className="mt-16" isLink title={"a账单"} />
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
        onConfirm={() => {
          console.log(snap.ledgerName);

        }}
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
