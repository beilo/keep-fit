import { Icon } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { ROUTE_PATHS } from "src/router";
import { ledgerStore } from "src/stores/ledger";

import { navigateTo } from "src/utils/navigate";

import "./index.less";

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
  {
    name: "我的页面",
    jump() {
      navigateTo({ url: ROUTE_PATHS["my-info"] });
    },
  },
  {
    name: "加入新账本",
    jump() {
      navigateTo({ url: ROUTE_PATHS["add-ledger-user"] });
    },
  },
  {
    name: "清账",
    jump() {
      if (ledgerStore.currentLedger?.ledgerId) {
        navigateTo({ url: ROUTE_PATHS["empty-ledger"] });
      }
    },
  },
];

interface IProps {
  show: boolean;
  onClose: () => void;
}
export default function Sidebar({ show, onClose }: IProps) {
  return (
    <View style={{ display: !show ? "none" : "" }}>
      <View className="mask" onClick={onClose}></View>
      <View className="sidebar-wrap">
        {SideBarList.map((item) => {
          return (
            <View
              className="sidebar-item"
              key={item.name}
              onClick={() => {
                item.jump();
                onClose();
              }}
            >
              {item.name}
              <Icon name="arrow" />
            </View>
          );
        })}
      </View>
    </View>
  );
}
