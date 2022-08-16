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
import { useEffect, useMemo, useState } from "react";
import { ROUTE_PATHS } from "src/router";
import { Row, Col } from "@antmjs/vantui";
import "./index.less";
import { observer, useLocalStore } from "mobx-react";
import { SwipeCell } from "@antmjs/vantui";

export default observer(function LedgerList() {
  const state = useLocalStore(() => ({}));

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
        <Button type="default">生成账本</Button>
      </View>
    </View>
  );
});
