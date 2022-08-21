import {
  Cell,
  CellGroup,
  Checkbox,
  Field,
  Notify,
  Stepper,
  Toast,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useMemo, useRef } from "react";
import { ROUTE_PATHS } from "src/router";

import "./index.less";

import { addBill } from "src/apis/bill";
import { STORAGE_KEYS } from "src/utils/storage";
import { proxy, useSnapshot } from "valtio";
import { toast } from "src/utils/toast";
import { navigateTo, redirectTo } from "src/utils/navigate";

type IStateUser = IUser & {
  isPay: boolean;
  payPrice: number;
  isTakePart: boolean;
  step: number;
};

export default function AddBill() {
  const state = useRef(
    proxy(
      new (class State {
        visPay = false;
        visTakePart = true;
        users: IStateUser[] = [];
        currentUser = 0;
        remarks = "";
      })()
    )
  ).current;
  const snap = useSnapshot(state);

  useEffect(() => {
    const initUsers = [
      {
        userId: 1,
        userName: "用户1",
      },
      {
        userId: 2,
        userName: "用户2",
      },
      {
        userId: 3,
        userName: "用户3",
      },
    ];

    state.currentUser = 1;
    const temp = initUsers.map((user) => ({
      ...user,
      isPay: state.currentUser === user.userId,
      payPrice: 0,
      isTakePart: true,
      step: 1,
    }));
    state.users = temp;
  }, []);

  const { sumPrice, averagePrice } = useMemo(() => {
    let sumPrice = 0;
    let takePartLength = 0;
    snap.users.forEach((user) => {
      if (user.isPay) {
        sumPrice += Number(user.payPrice);
      }
      if (user.isTakePart) {
        takePartLength += user.step;
      }
    });
    return {
      sumPrice: String(sumPrice),
      averagePrice: sumPrice / takePartLength,
    };
  }, [snap.users]);

  // todo 时间

  const onSubmit = () => {
    const payers: any[] = [],
      participants: any[] = [];
    state.users.forEach((user) => {
      payers.push({
        userId: user.userId,
        userName: user.userName,
        amount: user.payPrice,
      });
      participants.push({
        userId: user.userId,
        userName: user.userName,
        amount: averagePrice * user.step,
      });
    });
    console.log("payers", payers);
    console.log("participants", participants);
    console.log("remark", state.remarks);

    const param = {
      ledgerId: Taro.getStorageSync(STORAGE_KEYS.ledgerId),
      categoryId: 1,
      billAmount: Number(sumPrice),
      billTime: new Date().getTime().toString(),
      remarks: state.remarks,
      payers,
      participants,
    };
    apiAddBill(param);
  };
  const apiAddBill = async (data: IAddBillParams) => {
    toast.error('tiandafsdf');

    try {
      Toast.loading("新增中...");
      const res = await addBill(data);
      Toast.clear();
      if (res.data.code === 0) {
        toast.success('添加成功')
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
      error
    }
  };

  const onDelete = () => {
    calculate(state.users, undefined);
  };
  const onInput = (value_) => {
    if (value_ === "关闭") {
      redirectTo({
        url: ROUTE_PATHS.aa,
      });
      return;
    }
    calculate(state.users, value_);
  };
  const onCheckbox = (e, user, type: "isPay" | "isTakePart") => {
    e.stopPropagation();
    const draft = state.users;
    const idx = draft.findIndex((_) => _.userId === user.userId);
    if (type === "isPay") {
      draft[idx].isPay = !user.isPay;
      state.currentUser = user.userId;
    } else if (type === "isTakePart") {
      draft[idx].isTakePart = !user.isTakePart;
    }
  };
  const onStep = (user, step) => {
    const draft = state.users;
    const idx = draft.findIndex((_) => _.userId === user.userId);
    draft[idx].step = step;
  };

  const calculate = (draft, value_) => {
    const idx = draft.findIndex((_) => _.userId === state.currentUser);
    const user = draft[idx];
    const price = String(user.payPrice || "");
    const _payPrice = value_ !== undefined
      ? price + value_
      : price.slice(0, price.length - 1);
    user.payPrice = _payPrice;
  };

  return (
    <View className="popup-add-bill">
      <View className="top_wrap">
        <CellGroup title="消费" inset>
          <Cell title="其他" border={false} value={sumPrice} />
        </CellGroup>
        <View
          className="van-cell-group__title van-cell-group__title--inset"
          onClick={() => {
            state.visPay = !state.visPay;
          }}
        >
          {`付款人${snap.visPay ? "↗" : "↘"}`}
        </View>
        <CellGroup inset>
          {snap.users.map((user, idx) => {
            if (!snap.visPay && idx !== 0) return null;
            return (
              <Cell
                key={user.userId}
                border={false}
                value={user.payPrice}
                onClick={() => (state.currentUser = user.userId)}
                renderTitle={
                  <Checkbox
                    value={user.isPay}
                    onClick={(e) => {
                      onCheckbox(e, user, "isPay");
                    }}
                  >
                    {user.userName}
                  </Checkbox>
                }
              />
            );
          })}
        </CellGroup>
        <View
          className="van-cell-group__title van-cell-group__title--inset"
          onClick={() => {
            state.visTakePart = !state.visTakePart;
          }}
        >
          {`参与人${snap.visTakePart ? "↗" : "↘"}`}
        </View>
        <CellGroup inset>
          {snap.users.map((user, idx) => {
            if (!snap.visTakePart && idx !== 0) return null;
            return (
              <Cell
                key={user.userId}
                border={false}
                value={user.isTakePart ? averagePrice * user.step : 0}
                renderTitle={
                  <View className="take-part_wrap">
                    <Checkbox
                      value={user.isTakePart}
                      onClick={(e) => {
                        onCheckbox(e, user, "isTakePart");
                      }}
                    >
                      {user.userName}
                    </Checkbox>
                    <Stepper
                      className="take-part_wrap-step"
                      value={user.step}
                      integer
                      min={1}
                      onChange={(e) => {
                        onStep(user, e.detail);
                      }}
                    />
                  </View>
                }
              />
            );
          })}
        </CellGroup>
      </View>
      <View className="remark_input">
        <Field
          value={snap.remarks}
          className="remark_input"
          placeholder="备注"
          border={false}
          onChange={(e) => {
            state.remarks = e.detail;
          }}
        />
        <View className="number-key-board_wrap">
          <View className="number-key-board_left">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "关闭"].map((item) => {
              return (
                <View
                  key={item}
                  className="number-key-board_item"
                  onClick={() => {
                    onInput(item);
                  }}
                >
                  {item}
                </View>
              );
            })}
          </View>
          <View className="number-key-board_right">
            <View
              className="number-key-board_del"
              onClick={() => {
                onDelete();
              }}
            >
              x
            </View>
            <View className="number-key-board_confirm" onClick={onSubmit}>
              确定
            </View>
          </View>
        </View>
      </View>
      <Toast />
      <Notify />
    </View>
  );
}
