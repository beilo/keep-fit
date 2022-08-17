import {
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Field,
  Grid,
  GridItem,
  Stepper,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useSnapshot } from "valtio";
import { foodList2ActionSheetActions } from "./constant";
import { action, state } from "./store";

export default function Carb() {
  const snap = useSnapshot(state);

  useDidShow(() => {
    action.setKgCarbMultiple(
      Number(Taro.getStorageSync("kg")),
      Number(Taro.getStorageSync("carbMultiple")) || 2
    );
    let locFood = Taro.getStorageSync("food");
    if (locFood) {
      action.setAllFood(JSON.parse(locFood));
    }
  });
  const save2Storage = () => {
    Taro.setStorageSync("kg", snap.kg);
    Taro.setStorageSync("carbMultiple", snap.carbMultiple);
    Taro.setStorageSync("food", JSON.stringify(snap.food));
  };

  return (
    <>
      <CellGroup>
        <Field
          value={snap.kg}
          label="体重(kg)"
          placeholder="请输入体重(kg)"
          border={false}
          type="number"
          onChange={(e) => {
            action.setKgCarbMultiple(Number(e.detail || null), null);
          }}
          renderButton={
            <Button plain type="primary" onClick={save2Storage}>
              保存数据在本地
            </Button>
          }
        />
        <Cell
          title="动态碳水"
          renderExtra={
            <Stepper
              min="1"
              max="6"
              value={snap.carbMultiple}
              asyncChange
              onChange={(event) => {
                console.log("stepper", event);

                action.setKgCarbMultiple(null, Number(event.detail));
              }}
            />
          }
        />
        <Cell
          onClick={() => {
            action.setVisFoodSheet(true);
            action.setCurFoodTag("zao");
          }}
          title="早餐"
          renderExtra={<View>{snap.food[0].name}</View>}
        />
        <Cell
          onClick={() => {
            action.setVisFoodSheet(true);
            action.setCurFoodTag("zhong");
          }}
          title="练前餐"
          renderExtra={<View>{snap.food[1].name}</View>}
        />
        <Cell
          onClick={() => {
            action.setVisFoodSheet(true);
            action.setCurFoodTag("wan");
          }}
          title="练后餐"
          renderExtra={<View>{snap.food[2].name}</View>}
        />
      </CellGroup>
      <ActionSheet
        show={snap.visFoodSheet}
        actions={foodList2ActionSheetActions()}
        onClose={() => action.setVisFoodSheet(false)}
        onSelect={(event) => {
          action.setFood(event.detail);
        }}
      />

      <Grid columnNum={3} border={false}>
        <GridItem>
          早餐
          <View>
            {snap.food[0].name}: {snap.zaoFoodWeight()}g
          </View>
        </GridItem>
        <GridItem>
          练前餐
          <View>
            {snap.food[1].name}: {snap.startFoodWeight()}g
          </View>
        </GridItem>
        <GridItem>
          练后餐
          <View>
            {snap.food[2].name}: {snap.endFoodWeight()}g
          </View>
        </GridItem>
      </Grid>
    </>
  );
}
