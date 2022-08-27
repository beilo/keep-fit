import { proxy, useSnapshot } from "valtio";

const initState = {
  ledgerName: "",
  isAdd: false,
};
const state = proxy(initState);
export function setLedgerName(val) {
  state.ledgerName = val;
}
export function setIsAdd(val) {
  state.isAdd = val;
}
export function useStore() {
  return useSnapshot(state);
}
