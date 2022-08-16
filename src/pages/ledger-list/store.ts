import { proxy, useSnapshot } from "valtio";

const initState = {
  ledgerName: "",
  isAdd: false,
  ledgerList: [] as ILedger[],
};
const state = proxy(initState);
export function setLedgerName(val) {
  state.ledgerName = val;
}
export function setIsAdd(val) {
  state.isAdd = val;
}
export function setLedgerList(val) {
  state.ledgerList = val;
}
export function useStore() {
  return useSnapshot(state);
}
