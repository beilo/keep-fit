import { proxy, useSnapshot } from "valtio";
import { derive } from "valtio/utils";
import { FOOD_LIST } from "./constant";

const state = proxy({
  kg: 0,
  carbMultiple: 2,

  visFoodSheet: false,
  curFoodTag: "zao" as "zao" | "zhong" | "wan",
  food: [FOOD_LIST[0], FOOD_LIST[0], FOOD_LIST[0]] as TFood[],

  get zaoFoodWeight() {
    return (((state.sumCarb * 0.5) / state.food[0].carb) * 100).toFixed();
  },
  get startFoodWeight() {
    return (((state.sumCarb * 0.3) / state.food[1].carb) * 100).toFixed();
  },
  get endFoodWeight() {
    return (((state.sumCarb * 0.2) / state.food[2].carb) * 100).toFixed();
  },
});

export const derived  = derive({
    sumCarb: (get) => get(state).kg * get(state).carbMultiple,
    zaoFoodWeight: (get) => (((derived.sumCarb * 0.5) / state.food[0].carb) * 100).toFixed();

});

export function setKgCarbMultiple(
  kg: number | null,
  carbMultiple: number | null
) {
  if (kg) {
    state.kg = kg;
  }
  if (carbMultiple !== undefined && carbMultiple !== null) {
    state.carbMultiple = carbMultiple;
  }
}

export function setVisFoodSheet(bool: boolean) {
  state.visFoodSheet = bool;
}
export function setCurFoodTag(tag: "zao" | "zhong" | "wan") {
  state.curFoodTag = tag;
}
export function setFood(food: TFood) {
  if (state.curFoodTag === "zao") state.food[0] = food;
  if (state.curFoodTag === "zhong") state.food[1] = food;
  if (state.curFoodTag === "wan") state.food[2] = food;
}
export function setAllFood(arr: TFood[]) {
  state.food = arr;
}
