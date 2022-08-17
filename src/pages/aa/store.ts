import { proxy, useSnapshot } from "valtio";

class State {
  visAddBtnSheet: false;
  billList: IBill[] = [];
}
const state = proxy(new State());
export const useStore = () => {
  return useSnapshot(state);
};

export const action = {
  setVisAddBtnSheet(val) {
    state.visAddBtnSheet = val;
  },
  setBillList(val) {
    state.billList = val;
  },
};
