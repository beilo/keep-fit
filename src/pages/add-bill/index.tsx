import { Cell, CellGroup, Checkbox, Field, Stepper } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Immutable, produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { ROUTE_PATHS } from "src/router";

import "./index.less";

export default function AddBill() {
  const [remarks, setRemarks] = useState("");
  const [currentPayUserId, setCurrentPayUserId] = useState("");

  const [users, setUsers] = useState<
    Immutable<
      {
        name: string;
        id: string;
        isPay: boolean;
        payPrice: number;
        isTakePart: boolean;
        step: number;
      }[]
    >
  >([]);
  useEffect(() => {
    const serData = [
      {
        name: "雷鹏1",
        id: "1",
        isPay: false,
        payPrice: 0,
        isTakePart: false,
        step: 1,
      },
      {
        name: "雷鹏2",
        id: "2",
        isPay: false,
        payPrice: 0,
        isTakePart: false,
        step: 1,
      },
      {
        name: "雷鹏3",
        id: "3",
        isPay: false,
        payPrice: 0,
        isTakePart: false,
        step: 1,
      },
    ];
    const _serData = serData.map((item, index) => {
      if (index === 0) {
        item.isPay = true;
      }
      item.isTakePart = true;
      return item;
    });
    setUsers(_serData);
    setCurrentPayUserId(_serData[0].id);
  }, []);

  const { sumPrice, averagePrice } = useMemo(() => {
    let sumPrice = 0;
    let takePartLength = 0;
    users.forEach((user) => {
      if (user.isPay) {
        sumPrice += user.payPrice;
      }
      if (user.isTakePart) {
        takePartLength += user.step;
      }
    });
    return {
      sumPrice: String(sumPrice),
      averagePrice: sumPrice / takePartLength,
    };
  }, [users]);

  // todo 时间

  const onDelete = () => {
    setUsers(produce((draft) => calculate(draft, undefined)));
  };
  const onInput = (value_) => {
    if (value_ === '关闭') {
      Taro.navigateTo({
        url: ROUTE_PATHS.aa
      })
      return;
    }
    setUsers(produce((draft) => calculate(draft, value_)));
  };
  const onCheckbox = (e, user, type: "isPay" | "isTakePart") => {
    e.stopPropagation();
    setUsers(
      produce((draft) => {
        const idx = draft.findIndex((_) => _.id === user.id);
        if (type === "isPay") {
          draft[idx].isPay = !user.isPay;
          setCurrentPayUserId(user.id);
        } else if (type === "isTakePart") {
          draft[idx].isTakePart = !user.isTakePart;
        }
      })
    );
  };
  const onStep = (user, step) => {
    setUsers(
      produce((draft) => {
        const idx = draft.findIndex((_) => _.id === user.id);
        draft[idx].step = step;
      })
    );
  };

  const calculate = (draft, value_) => {
    const idx = draft.findIndex((_) => _.id === currentPayUserId);
    const user = draft[idx];
    const price = String(user.payPrice || "");
    const _payPrice = value_
      ? Number(price + value_)
      : Number(price.slice(0, price.length - 1));
    user.payPrice = _payPrice;
  };


  return (
    <View className="popup-add-bill">
      <View className="top_wrap">
        <CellGroup title="消费" inset>
          <Cell title="其他" border={false} value={sumPrice} />
        </CellGroup>
        <CellGroup title="付款人" inset>
          {users.map((user) => {
            return (
              <Cell
                key={user.id}
                border={false}
                value={user.payPrice}
                onClick={() => setCurrentPayUserId(user.id)}
                renderTitle={
                  <Checkbox
                    value={user.isPay}
                    onClick={(e) => {
                      onCheckbox(e, user, "isPay");
                    }}
                  >
                    {user.name}
                  </Checkbox>
                }
              />
            );
          })}
        </CellGroup>
        <CellGroup title="参与人" inset>
          {users.map((user) => {
            return (
              <Cell
                key={user.id}
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
                      {user.name}
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
          value={remarks}
          className="remark_input"
          placeholder="备注"
          type="number"
          border={false}
          onChange={(e) => {
            setRemarks(e.detail);
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
            <View className="number-key-board_confirm">
              确定
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
