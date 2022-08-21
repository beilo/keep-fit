import { Cell, CellGroup, SwipeCell, Toast } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { delBill, getBillList } from "src/apis/bill";
import Sidebar from "src/components/sidebar";
import { ROUTE_PATHS } from "src/router";

import { Icon } from "@antmjs/vantui";
import "./index.less";
import { action, useStore } from "./store";
import { navigateTo } from "src/utils/navigate";


function AA() {
  const snap = useStore();

  const apiGetBillList = async () => {
    try {
      Toast.loading("查询中...");
      const res = await getBillList({
        ledgerId: Number(Taro.getStorageSync("ledgerId")),
      });
      Toast.clear();
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
  }, []);

  const apiDelLedger = async (billId: number) => {
    try {
      const res = await delBill(billId);
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
                        {item.participants?.length || 0}人消费
                      </View>
                    </View>
                  }
                />
              </SwipeCell>
            );
          })}
        </CellGroup>
      </View>
      <View className="btn-add">
        <Icon
          name="fire"
          size="32px"
          color="#000"
          onClick={() => {
            navigateTo({
              url: ROUTE_PATHS["add-bill"],
            });
          }}
        ></Icon>
      </View>

      <Sidebar />
      <Toast id="toast" />
    </>
  );
}

export default AA;
