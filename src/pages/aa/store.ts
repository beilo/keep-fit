import { proxy, useSnapshot } from "valtio";

class State {
  billList: IBill[] = [];
}
const state = proxy(new State());
export const useStore = () => {
  return useSnapshot(state);
};

export const action = {
  setBillList(val) {
    state.billList = val;
  },
};
