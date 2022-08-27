
export const FOOD_LIST = [
  {
    name: "大米",
    carb: 77,
  },
  {
    name: "糙米",
    carb: 75,
  },
  {
    name: "面条",
    carb: 65,
  },
  {
    name: "馒头",
    carb: 47,
  },
];

export const foodList2ActionSheetActions = () => {
  return FOOD_LIST.map((item) => ({
    ...item,
    text: item.name,
  }));
};
