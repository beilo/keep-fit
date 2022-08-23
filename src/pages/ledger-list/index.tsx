import { Button, Cell, Dialog, Field, SwipeCell, Toast } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import { addLedger, delLedger, getLedgerList } from "src/apis/ledger";
import { ROUTE_PATHS } from "src/router";
import { actionsLedgerStore, ledgerStore } from "src/stores/ledger";
import { redirectTo } from "src/utils/navigate";
import { useSnapshot } from "valtio";
import "./index.less";
import { setIsAdd, setLedgerName, useStore } from "./store";

export default function LedgerList() {
  const snap = useStore();
  const { ledgerList: snapLedgers } = useSnapshot(ledgerStore);

  const apiGetLedgerList = async () => {
    try {
      Toast.loading("查询中...");
      const res = await getLedgerList({});
      Toast.clear();
      if (res.data.code === 0) {
        res.data.data && actionsLedgerStore.setLedgerList(res.data.data);
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      Toast.fail(error.message);
    }
  };
  useEffect(() => {
    apiGetLedgerList();
  }, []);

  const apiAddLedger = async () => {
    try {
      Toast.loading("新增中...");
      const res = await addLedger(snap.ledgerName);
      Toast.clear();
      if (res.data.code === 0) {
        apiGetLedgerList();
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      Toast.fail(error.message);
    }
    setIsAdd(false);
  };
  const confirm = async () => {
    apiAddLedger();
  };

  const apiDelLedger = async (ledgerId: number) => {
    try {
      Toast.loading("删除中...");
      const res = await delLedger(ledgerId);
      Toast.clear();
      if (res.data.code === 0) {
        apiGetLedgerList();
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      Toast.fail(error.message);
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
