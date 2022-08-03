import { Cell, CellGroup, Checkbox, Field } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";

import "./index.less";

export function PopupAddBill() {
  const [sumPrice, setSumPrice] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [remarks, setRemarks] = useState("");
  const [currentPayUserId, setCurrentPayUserId] = useState("");

  const [users, setUsers] = useState<
    {
      name: string;
      id: string;
      isPay: boolean;
      payPrice: number;
      isTakePart: boolean;
      takePartPrice: number;
    }[]
  >([]);
  useEffect(() => {
    const serData = [
      {
        name: "雷鹏1",
        id: "1",
        isPay: false,
        payPrice: 0,
        isTakePart: false,
        takePartPrice: 0,
      },
      {
        name: "雷鹏2",
        id: "2",
        isPay: false,
        payPrice: 0,
        isTakePart: false,
        takePartPrice: 0,
      },
      {
        name: "雷鹏3",
        id: "3",
        isPay: false,
        payPrice: 0,
        isTakePart: false,
        takePartPrice: 0,
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

  useEffect(() => {
    let sumPrice = 0;
    let takePartCount = 0;
    users.forEach((user) => {
      if (user.isPay) {
        sumPrice += user.payPrice;
      }
      if (user.isTakePart) {
        takePartCount++;
      }
    });
    setSumPrice(String(sumPrice));
    setAveragePrice(String(sumPrice / takePartCount));
  }, [users]);

  // todo 时间

  const onDelete = () => {
    setUsers((pre) => {
      const idx = pre.findIndex((_) => _.id === currentPayUserId);
      const price = String(pre[idx].payPrice || "");
      pre[idx].payPrice = Number(price.slice(0, price.length - 1));
      return [...pre];
    });
  };
  const onInput = (value_) => {
    setUsers((pre) => {
      const idx = pre.findIndex((_) => _.id === currentPayUserId);
      const price = String(pre[idx].payPrice || "");
      pre[idx].payPrice = Number(price + value_);
      return [...pre];
    });
  };

  return (
    <>
      <View className="popup-add-bill--top_wrap">
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
                      e.stopPropagation();
                      setCurrentPayUserId(user.id);
                      setUsers((pre) => {
                        const idx = pre.findIndex((_) => _.id === user.id);
                        pre[idx].isPay = !user.isPay;
                        return [...pre];
                      });
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
                value={user.isTakePart ? averagePrice : 0}
                renderTitle={
                  <Checkbox
                    value={user.isTakePart}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPayUserId(user.id);
                      setUsers((pre) => {
                        const idx = pre.findIndex((_) => _.id === user.id);
                        pre[idx].isTakePart = !user.isTakePart;
                        return [...pre];
                      });
                    }}
                  >
                    {user.name}
                  </Checkbox>
                }
              />
            );
          })}
        </CellGroup>
      </View>
      <View className="popup-add-bill--remark_input">
        <Field
          value={remarks}
          className="popup-add-bill--remark_input"
          placeholder="备注"
          type="number"
          border={false}
          onChange={(e) => {
            setRemarks(e.detail);
          }}
        />
        <View className="popup-add-bill--number-key-board_wrap">
          <View className="popup-add-bill--number-key-board_left">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", ""].map((item) => {
              return (
                <View
                  key={item}
                  className="popup-add-bill--number-key-board_item"
                  onClick={() => {
                    onInput(item);
                  }}
                >
                  {item}
                </View>
              );
            })}
          </View>
          <View className="popup-add-bill--number-key-board_right">
            <View
              className="popup-add-bill--number-key-board_del"
              onClick={() => {
                onDelete();
              }}
            >
              x
            </View>
            <View className="popup-add-bill--number-key-board_confirm">
              确定
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
