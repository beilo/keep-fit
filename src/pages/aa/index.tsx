import {
  Cell,
  CellGroup,
  Notify,
  PowerScrollView,
  SwipeCell,
  Toast,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import { delBill, getBillList } from "src/apis/bill";
import Sidebar from "src/components/sidebar";
import { ROUTE_PATHS } from "src/router";

import { Icon } from "@antmjs/vantui";
import { navigateTo, redirectTo } from "src/utils/navigate";
import { toast } from "src/utils/toast";
import { proxy, useSnapshot } from "valtio";
import "./index.less";

function AA() {
  const state = useRef(
    proxy(
      new (class State {
        billList: IBill[] = [];
        basicsFinished = false;
        visSidebar = false;
      })()
    )
  ).current;
  const snap = useSnapshot(state);

  const apiDelLedger = async (billId: number) => {
    try {
      const res = await delBill(billId);
      if (res.data.code === 0) {
        basicsDoRefresh();
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

  let pageIndex = useRef(0).current;
  const apiRefresh = async (isRefresh = false) => {
    pageIndex = isRefresh ? 0 : ++pageIndex;
    try {
      const res = await getBillList({
        ledgerId: Number(Taro.getStorageSync("ledgerId")),
        billState: 0,
        pageIndex,
      });
      if (res.data.code === 0) {
        const data = res.data.data || [];

        if (pageIndex === 0) {
          state.billList = data;
        } else {
          state.billList.push(...data);
        }
        state.basicsFinished = data.length < 10;
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      !isRefresh && --pageIndex;
      toast.error(error.message);
    }
  };
  const basicsDoRefresh = async () => {
    await apiRefresh(true);
  };
  const basicsLoadMore = async () => {
    await apiRefresh();
  };
  useEffect(() => {
    basicsDoRefresh();
  }, []);

  return (
    <>
      <View className="aa">
        <CellGroup className="header-wrap">
          <Cell
            title={"xxx账本"}
            isLink
            onClick={() => {
              redirectTo({ url: ROUTE_PATHS["ledger-list"] });
            }}
          />
          <Cell title={"账本成员"} label={"共xx人, 全员消费xx元"} isLink />
          <Cell
            title={"其他操作"}
            isLink
            onClick={() => (state.visSidebar = true)}
          />
        </CellGroup>
        <PowerScrollView
          className="scorll-wrap"
          finishedText="没有更多了"
          successText="刷新成功"
          onScrollToUpper={basicsDoRefresh}
          onScrollToLower={basicsLoadMore}
          current={snap.billList.length || 0}
          pageSize={10}
          finished={snap.basicsFinished}
        >
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
        </PowerScrollView>
      </View>

      <View
        className="btn-add"
        onClick={() => {
          navigateTo({
            url: ROUTE_PATHS["add-bill"],
          });
        }}
      >
        记账
      </View>
      <Sidebar
        show={snap.visSidebar}
        onClose={() => (state.visSidebar = false)}
      />

      <Notify />
      <Toast />
    </>
  );
}

export default AA;
