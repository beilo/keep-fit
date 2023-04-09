import { Cell, CellGroup, Notify, Toast } from "@antmjs/vantui";
import { ScrollView, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";

import classNames from "classnames/bind";
import { useRef } from "react";
import { delBill, getBillList } from "src/apis/bill";
import { getLedgerProfile } from "src/apis/ledger";
import Sidebar from "src/components/sidebar";
import { ROUTE_PATHS } from "src/router";
import { ledgerStore } from "src/stores/ledger";
import { addRouterParams, navigateTo, redirectTo } from "src/utils/navigate";
import { toast } from "src/utils/toast";
import { proxy, useSnapshot } from "valtio";
import BillList from "./components/bill-list";
import { PopDetail } from "./components/pop-detail";
import styles from "./index.module.less";
const cx = classNames.bind(styles);

class IPopDetail {
  vis: boolean;
  bill: IBill | undefined;
}
class State {
  billList: IBill[] = [];
  basicsFinished = false;
  visSidebar = false;
  ledgerProfile: ILedgerProfile | null;
  popDetail: IPopDetail = {
    vis: false,
    bill: undefined,
  };
}
function AA() {
  const state = useRef(proxy(new State())).current;
  const snap = useSnapshot(state) as typeof state;

  const apiGetLedgerProfile = async () => {
    let ledgerId = ledgerStore.currentLedger?.ledgerId;
    if (!ledgerId) return;
    try {
      const res = await getLedgerProfile(ledgerId);
      if (res.data.code === 0 && res.data.data) {
        state.ledgerProfile = res.data.data;
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useDidShow(() => {
    onRefresh();
    apiGetLedgerProfile();
  });

  const apiDelLedger = async (billId: number) => {
    try {
      const res = await delBill(billId);
      if (res.data.code === 0) {
        onRefresh();
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const del = async (billId: number) => {
    apiDelLedger(billId);
  };

  const pageIndexRef = useRef(0);
  const isCallApiRefreshRef = useRef(false);
  const apiRefresh = async (isRefresh = false) => {
    isCallApiRefreshRef.current = true;

    let pageIndex = pageIndexRef.current;
    if (isRefresh) {
      pageIndex = 0;
    } else {
      pageIndex += 1;
    }
    try {
      const res = await getBillList({
        ledgerId: ledgerStore.currentLedger?.ledgerId ?? 0,
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
        if (data.length >= 10 || pageIndex === 0) {
          pageIndexRef.current = pageIndex;
        }
        state.basicsFinished = data.length < 10;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      isCallApiRefreshRef.current = false;
    }
  };
  const onRefresh = async () => {
    await apiRefresh(true);
  };
  const onLoadMore = async () => {
    if (state.basicsFinished) return;
    await apiRefresh();
  };
  const isLoadingMore = useRef(false);

  return (
    <>
      <View className={cx("aa")}>
        <ScrollView
          scrollY={true}
          style={{ height: "100vh" }}
          lowerThreshold={150}
          onScrollToLower={async () => {
            if (isLoadingMore.current) return;
            try {
              await onLoadMore();
              isLoadingMore.current = false;
            } catch (error) {
              isLoadingMore.current = false;
            }
          }}
        >
          <CellGroup className={cx("header-wrap")}>
            <Cell
              title={snap.ledgerProfile?.name || "未获取到账单名称"}
              isLink
              onClick={() => {
                redirectTo({ url: ROUTE_PATHS["ledger-list"] });
              }}
            />
            <Cell
              title={"账本成员"}
              label={`共${
                snap.ledgerProfile?.members?.length || 0
              }人, 全员消费${snap.ledgerProfile?.totalConsume || 0}元`}
              isLink
              onClick={() => {
                Taro.setClipboardData({
                  data: String(snap.ledgerProfile?.ledgerCode),
                });
              }}
            />
            <Cell
              title={"其他操作"}
              isLink
              onClick={() => (state.visSidebar = true)}
            />
          </CellGroup>
          <BillList
            data={snap.billList}
            onItemClick={(data) => {
              state.popDetail.vis = true;
              state.popDetail.bill = data;
            }}
          />
        </ScrollView>
      </View>


      <PopDetail
        vis={snap.popDetail.vis}
        bill={snap.popDetail.bill}
        onClose={() => {
          state.popDetail.vis = false;
        }}
        onEdit={() => {
          navigateTo({
            url: addRouterParams(ROUTE_PATHS["add-bill"], {
              bill: JSON.stringify(state.popDetail.bill),
            }),
          });
          state.popDetail.vis = false;
        }}
        onDel={() => {
          const billId = state.popDetail.bill?.billId;
          if (billId) {
            del(billId);
            state.popDetail.vis = false;
          }
        }}
      />
      <View
        className={cx("btn-add")}
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
