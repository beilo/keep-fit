import {
  Cell,
  CellGroup,
  Notify,
  PowerScrollView,
  SwipeCell,
  Toast,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import dayjs from "dayjs";
import { useRef } from "react";
import { delBill, getBillList } from "src/apis/bill";
import { getLedgerProfile } from "src/apis/ledger";
import Sidebar from "src/components/sidebar";
import { ROUTE_PATHS } from "src/router";
import { ledgerStore } from "src/stores/ledger";
import { addRouterParams, navigateTo, redirectTo } from "src/utils/navigate";
import { toast } from "src/utils/toast";
import { proxy, useSnapshot } from "valtio";
import styles from './index.module.less';
import classNames from 'classnames/bind';
import { PopDetail } from "./components/pop-detail";
const cx = classNames.bind(styles);

class IPopDetail {
  vis: boolean;
  bill: IBill | undefined
}
class State {
  billList: IBill[] = [];
  basicsFinished = false;
  visSidebar = false;
  ledgerProfile: ILedgerProfile | null;
  popDetail: IPopDetail = {
    vis: false,
    bill: undefined
  }
}
function AA() {
  const state = useRef(
    proxy(
      new State()
    )
  ).current;
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
    basicsDoRefresh();
    apiGetLedgerProfile();
  });

  const apiDelLedger = async (billId: number) => {
    try {
      const res = await delBill(billId);
      if (res.data.code === 0) {
        basicsDoRefresh();
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

  let pageIndex = useRef(0).current;
  const apiRefresh = async (isRefresh = false) => {
    pageIndex = isRefresh ? 0 : ++pageIndex;
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


  return (
    <>
      <PopDetail vis={snap.popDetail.vis} bill={snap.popDetail.bill}
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
      <View className={cx('aa')}>
        <CellGroup className={cx('header-wrap')}>
          <Cell
            title={snap.ledgerProfile?.name || "未获取到账单名称"}
            isLink
            onClick={() => {
              redirectTo({ url: ROUTE_PATHS["ledger-list"] });
            }}
          />
          <Cell
            title={"账本成员"}
            label={`共${snap.ledgerProfile?.members?.length || 0}人, 全员消费${snap.ledgerProfile?.totalConsume || 0
              }元`}
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
        <PowerScrollView
          className={cx("scorll-wrap")}
          finishedText="没有更多了"
          successText="刷新成功"
          onScrollToUpper={basicsDoRefresh}
          onScrollToLower={basicsLoadMore}
          current={snap.billList.length || 0}
          pageSize={10}
          finished={snap.basicsFinished}
        >
          {snap.billList.map((item) => {
            const payers = item.payers;
            let payerText = payers?.[0]?.userName || "";
            if (payerText && payers.length > 1) {
              payerText = payers.length + "人";
            }
            payerText && (payerText += "付款");
            return (
              <SwipeCell
                key={item.billId}
                rightWidth={120}
                onClick={() => {
                  state.popDetail.vis = true;
                  state.popDetail.bill = item;
                }}
              >
                <Cell
                  title={item.remarks || item.categoryName}
                  label={dayjs(item.billTime).format("YYYY-MM-DD HH:mm")}
                  border={true}
                  renderExtra={
                    <View>
                      <View className={cx("price")}>{item.billAmount}</View>
                      <View className={cx("number-people")}>
                        {item.participants?.length || 0}人消费，{payerText}
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
