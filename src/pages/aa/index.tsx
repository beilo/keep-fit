import { ActionSheet, Cell, CellGroup, SwipeCell, Toast } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect } from "react";
import { delBill, getBillList } from "src/apis/bill";
import { ROUTE_PATHS } from "src/router";

import "./index.less";
import { action, useStore } from "./store";

function AA() {
  const snap = useStore();
  const router = useRouter<{ ledgerId: string }>();

  const apiGetBillList = async () => {
    try {
      Toast.loading("查询中...");
      const res = await getBillList({
        ledgerId: Number(router.params.ledgerId),
      });
      Toast.clear();
      console.log(res);

      if (res.data.code === 0) {
        action.setBillList(res.data.data);
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      Toast.fail(error.message);
    }
  };
  useEffect(() => {
    apiGetBillList();
  }, [router.params.ledgerId]);

  const apiDelLedger = async (billId: number) => {
    try {
      Toast.loading("删除中...");
      const res = await delBill(billId);
      Toast.clear();
      if (res.data.code === 0) {
        apiGetBillList();
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      Toast.fail(error.message);
    }
  };
  const del = async (billId: number) => {
    apiDelLedger(billId);
  };

  return (
    <>
      <View className="aa">
        <CellGroup>
          {snap.billList.map((item) => {
            return (
              <SwipeCell
                key={item.billId}
                rightWidth={60}
                renderRight={
                  <View
                    className="del-btn"
                    onClick={() => {
                      del(item.billId);
                    }}
                  >
                    删除
                  </View>
                }
              >
                <Cell
                  title={item.categoryName}
                  label={`${item.billTime} ${item.remarks}`}
                  border={true}
                  renderExtra={
                    <View>
                      <View className="price">{item.billAmount}</View>
                      <View className="number-people">
                        {item.participants.length}人消费
                      </View>
                    </View>
                  }
                />
              </SwipeCell>
            );
          })}
        </CellGroup>
      </View>
      <View
        className="btn-add"
        onClick={() => {
          action.setVisAddBtnSheet(true);
        }}
      >
        <View className="btn-add-line"></View>
        <View className="btn-add-row"></View>
      </View>

      <ActionSheet
        show={snap.visAddBtnSheet}
        actions={[
          {
            name: "记账",
          },
          {
            name: "取消",
          },
        ]}
        onClose={() => action.setVisAddBtnSheet(false)}
        onSelect={(e) => {
          action.setVisAddBtnSheet(false);
          const detail = e.detail;
          Promise.resolve().then(() => {
            if (detail.name === "记账") {
              Taro.navigateTo({
                url: ROUTE_PATHS["add-bill"],
              });
            } else if (detail.name === "取消") {
              action.setVisAddBtnSheet(false);
            }
          });
        }}
      />
    </>
  );
}

export default AA;
