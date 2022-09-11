import {
  Button,
  Cell,
  Dialog,
  Field,
  Notify,
  SwipeCell,
  Toast,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import { addLedger, delLedger, getLedgerList } from "src/apis/ledger";
import { ROUTE_PATHS } from "src/router";
import { actionsLedgerStore, ledgerStore } from "src/stores/ledger";
import { navigateTo, redirectTo } from "src/utils/navigate";
import { hideLoading, loading, toast } from "src/utils/toast";
import { useSnapshot } from "valtio";
import "./index.less";

export default function LedgerList() {
  const [ledgerName, setLedgerName] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const { ledgerList: snapLedgers } = useSnapshot(ledgerStore);

  const apiGetLedgerList = async () => {
    try {
      loading("查询中...");
      const res = await getLedgerList({});
      hideLoading();
      if (res.data.code === 0) {
        res.data.data && actionsLedgerStore.setLedgerList(res.data.data);
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useDidShow(() => {
    apiGetLedgerList();
  });

  const apiAddLedger = async () => {
    try {
      loading("新增中...");
      const res = await addLedger(ledgerName);
      hideLoading();
      if (res.data.code === 0) {
        apiGetLedgerList();
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setIsAdd(false);
  };
  const confirm = async () => {
    apiAddLedger();
  };

  const apiDelLedger = async (ledgerId: number) => {
    try {
      loading("删除中...");
      const res = await delLedger(ledgerId);
      hideLoading();
      if (res.data.code === 0) {
        apiGetLedgerList();
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const del = async (ledgerId: number) => {
    apiDelLedger(ledgerId);
  };

  const jumpAA = (ledger: ILedger) => {
    actionsLedgerStore.setCurrentLedger(ledger);
    redirectTo({ url: ROUTE_PATHS.aa });
  };
  return (
    <View className="ledger-list">
      {snapLedgers?.map((item) => {
        return (
          <SwipeCell
            rightWidth={60}
            renderRight={
              <View
                className="del-btn"
                onClick={() => {
                  del(item.ledgerId);
                }}
              >
                删除
              </View>
            }
          >
            <Cell
              key={item.ledgerId}
              className="mt-16"
              isLink
              title={item.name}
              onClick={() => {
                jumpAA(item as ILedger);
              }}
            />
          </SwipeCell>
        );
      })}

      <View className="bottom-wrap">
        <Button
          plain
          type="primary"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          生成账本
        </Button>
        <Button
          plain
          type="info"
          onClick={() => {
            navigateTo({ url: ROUTE_PATHS["add-ledger-user"] });
          }}
        >
          加入新账本
        </Button>
      </View>

      <Dialog
        id="vanDialog3"
        title="新增账本"
        showCancelButton
        showConfirmButton
        show={isAdd}
        onClose={() => {
          setIsAdd(false);
        }}
        onConfirm={confirm}
      >
        <Field
          placeholder="请输入账本名称"
          value={ledgerName}
          onChange={(e) => {
            setLedgerName(e.detail);
          }}
        />
      </Dialog>
      <Toast />
      <Notify />
    </View>
  );
}
