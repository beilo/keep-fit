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

export default observer(function LedgerList() {
  const state = useLocalStore(() => ({
    isEdit: false,
    switchEdit() {
      state.isEdit = !state.isEdit;
    },
  }));

  return (
    <View className="ledger-list">
      <View className="operating-bar">
        <Button
          type="default"
          className="edit-btn"
          plain
          onClick={state.switchEdit}
        >
          {state.isEdit ? "退出编辑" : "编辑"}
        </Button>
      </View>

      <Cell
        isLink
        renderTitle={
          <Checkbox value={true} onClick={(e) => {}}>
            a账单
          </Checkbox>
        }
      />
      <Cell
        className="mt-16"
        isLink
        renderTitle={
          <Checkbox value={true} onClick={(e) => {}}>
            b账单
          </Checkbox>
        }
      />

      <View className="bottom-wrap">
        {state.isEdit ? (
          <Button type="danger">删除账本</Button>
        ) : (
          <Button type="default">生成账本</Button>
        )}
      </View>
    </View>
  );
});
