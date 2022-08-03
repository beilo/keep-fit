import { Cell, CellGroup, Field, Popup } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { observer } from "mobx-react";

import "./index.less";
import { PopupAddBill } from "./popup-add-bill";

function AA() {
  return (
    <>
      {/* <View>
        <CellGroup>
          <Cell
            title="其他"
            label="07/23 22:36 饭+菜"
            border={false}
            renderExtra={
              <>
                <View className="price">18.5</View>
                <View className="number-people">2人消费</View>
              </>
            }
          />
        </CellGroup>
      </View>
      <View className="aa--btn-add">
        <View className="aa--btn-add-line"></View>
        <View className="aa--btn-add-row"></View>
      </View> */}

      <PopupAddBill />
    </>
  );
}

export default observer(AA);
