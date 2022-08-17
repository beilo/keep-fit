import { proxy } from "valtio";
import { FOOD_LIST } from "./constant";

class State {
  kg = 0;
  carbMultiple = 2;

  visFoodSheet = false;
  curFoodTag: "zao" | "zhong" | "wan" = "zao";
  food = [FOOD_LIST[0], FOOD_LIST[0], FOOD_LIST[0]] as TFood[];
  sumCarb() {
    return this.kg * this.carbMultiple;
  }
  zaoFoodWeight() {
    return (((this.sumCarb() * 0.5) / this.food[0].carb) * 100).toFixed();
  }
  startFoodWeight() {
    return (((this.sumCarb() * 0.3) / this.food[1].carb) * 100).toFixed();
  }
  endFoodWeight() {
    return (((this.sumCarb() * 0.2) / this.food[2].carb) * 100).toFixed();
  }
}

export const state = proxy(new State());

export const action = {
  setKgCarbMultiple(kg: number | null, carbMultiple: number | null) {
    if (kg) {
      state.kg = kg;
    }
    if (carbMultiple !== undefined && carbMultiple !== null) {
      state.carbMultiple = carbMultiple;
    }
  },
  setVisFoodSheet(bool: boolean) {
    state.visFoodSheet = bool;
  },
  setCurFoodTag(tag: "zao" | "zhong" | "wan") {
    state.curFoodTag = tag;
  },
  setFood(food: TFood) {
    if (state.curFoodTag === "zao") state.food[0] = food;
    if (state.curFoodTag === "zhong") state.food[1] = food;
    if (state.curFoodTag === "wan") state.food[2] = food;
  },
  setAllFood(arr: TFood[]) {
    state.food = arr;
  },
};
