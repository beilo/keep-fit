import { ActionSheet, Cell, CellGroup } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer } from "mobx-react";
import { useState } from "react";
import { ROUTE_PATHS } from "src/router";


import "./index.less";

function AA() {
  const [visAddBtnSheet, setVisAddBtnSheet] = useState(false);
  return (
    <>
      <View className="aa">
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
      <View className="btn-add" onClick={() => {
        setVisAddBtnSheet(true)
      }}>
        <View className="btn-add-line"></View>
        <View className="btn-add-row"></View>
      </View>

      <ActionSheet
        show={visAddBtnSheet}
        actions={[{
          name: '记账',
        }, {
          name: '取消',
        }]}
        onClose={() => setVisAddBtnSheet(false)}
        onSelect={(e) => {
          setVisAddBtnSheet(false);
          const detail = e.detail;
          Promise.resolve().then(() => {
            if (detail.name === '记账') {
              Taro.navigateTo({
                url: ROUTE_PATHS["add-bill"]
              })
            } else if (detail.name === '取消') {
              setVisAddBtnSheet(false)
            }
          })
        }}
      />
    </>
  );
}

export default observer(AA);
