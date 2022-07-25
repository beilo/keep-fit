import {
    ActionSheet,
    Button,
    Cell,
    CellGroup,
    Field,
    Grid,
    GridItem,
    Stepper
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { observer, useLocalStore } from "mobx-react";
import { foodList2ActionSheetActions, FOOD_LIST } from "./constant";

function Carb() {
  const store = useLocalStore(() => ({
    kg: undefined,
    carbMultiple: 2,
    setKgCarbMultiple(kg: number | null, carbMultiple: number | null) {
      if (kg) {
        this.kg = kg;
      }
      if (carbMultiple !== undefined && carbMultiple !== null) {
        this.carbMultiple = carbMultiple;
      }
    },
    visFoodSheet: false,
    setVisFoodSheet(bool: boolean) {
      this.visFoodSheet = bool;
    },
    curFoodTag: "zao" as "zao" | "zhong" | "wan",
    setCurFoodTag(tag: "zao" | "zhong" | "wan") {
      this.curFoodTag = tag;
    },
    food: [FOOD_LIST[0], FOOD_LIST[0], FOOD_LIST[0]] as TFood[],
    setFood(food: TFood) {
      if (this.curFoodTag === "zao") this.food[0] = food;
      if (this.curFoodTag === "zhong") this.food[1] = food;
      if (this.curFoodTag === "wan") this.food[2] = food;
    },
    setAllFood(arr: TFood[]) {
      this.food = arr;
    },

    // computed
    get sumCarb() {
      return this.kg * this.carbMultiple;
    },
    get zaoFoodWeight() {
      return (((this.sumCarb * 0.5) / this.food[0].carb) * 100).toFixed();
    },
    get startFoodWeight() {
      return (((this.sumCarb * 0.3) / this.food[1].carb) * 100).toFixed();
    },
    get endFoodWeight() {
      return (((this.sumCarb * 0.2) / this.food[2].carb) * 100).toFixed();
    },
  }));

  useDidShow(() => {
    store.setKgCarbMultiple(
      Number(Taro.getStorageSync("kg")),
      Number(Taro.getStorageSync("carbMultiple")) || 2
    );
    let locFood = Taro.getStorageSync("food");
    if (locFood) {
      store.setAllFood(JSON.parse(locFood));
    }
  });
  const save2Storage = () => {
    Taro.setStorageSync("kg", store.kg);
    Taro.setStorageSync("carbMultiple", store.carbMultiple);
    Taro.setStorageSync("food", JSON.stringify(store.food));
  };

  return (
    <>
      <CellGroup>
        <Field
          value={store.kg}
          label='体重(kg)'
          placeholder='请输入体重(kg)'
          border={false}
          type='number'
          onChange={(e) => {
            store.setKgCarbMultiple(Number(e.detail || null), null);
          }}
          renderButton={
            <Button plain type='primary' onClick={save2Storage}>
              保存数据在本地
            </Button>
          }
        />
        <Cell
          title='动态碳水'
          renderExtra={
            <Stepper
              min='1'
              max='6'
              value={store.carbMultiple}
              asyncChange
              onChange={(event) => {
                console.log("stepper", event);

                store.setKgCarbMultiple(null, Number(event.detail));
              }}
            />
          }
        />
        <Cell
          onClick={() => {
            store.setVisFoodSheet(true);
            store.setCurFoodTag("zao");
          }}
          title='早餐'
          renderExtra={<View>{store.food[0].name}</View>}
        />
        <Cell
          onClick={() => {
            store.setVisFoodSheet(true);
            store.setCurFoodTag("zhong");
          }}
          title='练前餐'
          renderExtra={<View>{store.food[1].name}</View>}
        />
        <Cell
          onClick={() => {
            store.setVisFoodSheet(true);
            store.setCurFoodTag("wan");
          }}
          title='练后餐'
          renderExtra={<View>{store.food[2].name}</View>}
        />
      </CellGroup>
      <ActionSheet
        show={store.visFoodSheet}
        actions={foodList2ActionSheetActions()}
        onClose={() => store.setVisFoodSheet(false)}
        onSelect={(event) => {
          store.setFood(event.detail);
        }}
      />

      <Grid columnNum={3} border={false}>
        <GridItem>
          早餐
          <View>
            {store.food[0].name}: {store.zaoFoodWeight}g
          </View>
        </GridItem>
        <GridItem>
          练前餐
          <View>
            {store.food[1].name}: {store.startFoodWeight}g
          </View>
        </GridItem>
        <GridItem>
          练后餐
          <View>
            {store.food[2].name}: {store.endFoodWeight}g
          </View>
        </GridItem>
      </Grid>
    </>
  );
}

export default observer(Carb);
console.log(foodList2ActionSheetActions());
