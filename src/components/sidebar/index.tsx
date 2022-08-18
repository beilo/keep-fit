import { Icon } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { ROUTE_PATHS } from "src/router";
import { proxy, useSnapshot } from "valtio";

import { navigateTo } from "src/utils/navigate";
import "./index.less";

const state = proxy(
  new (class State {
    show = false;
  })()
);

const SideBarList = [
  {
    name: "账本管理",
    jump() {
      navigateTo({ url: ROUTE_PATHS["ledger-list"] });
    },
  },
  {
    name: "碳水管理",
    jump() {
      navigateTo({ url: ROUTE_PATHS.carb });
    },
  },
];

export default function Sidebar() {
  const snap = useSnapshot(state);

  const setShow = () => (state.show = !state.show);
  return (
    <>
      <View className="sidebar-fixed-btn" onClick={setShow}>
        打开
      </View>
      {snap.show ? (
        <>
          <View className="mask" onClick={setShow}></View>
          <View className="sidebar-wrap">
            <View className="sidebar-header">header 头</View>
            {SideBarList.map((item) => {
              return (
                <View
                  className="sidebar-item"
                  key={item.name}
                  onClick={() => {
                    item.jump();
                    setShow();
                  }}
                >
                  {item.name}
                  <Icon name="arrow" />
                </View>
              );
            })}
          </View>
        </>
      ) : null}
    </>
  );
}
