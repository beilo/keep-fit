import {
  getStorageSync,
  setStorageSync,
  STORAGE_KEYS,
} from "src/utils/storage";
import { proxy, subscribe } from "valtio";
class LedgerStore {
  ledgerList: ILedger[] = [];
  currentLedger: ILedger | null = null;
}
const proxyValue =
  (getStorageSync(STORAGE_KEYS.ledgerStore) as LedgerStore) ||
  new LedgerStore();
export const ledgerStore = proxy(proxyValue);
subscribe(ledgerStore, () => {
  setStorageSync(STORAGE_KEYS.ledgerStore, ledgerStore);
});

export const actionsLedgerStore = {
  setLedgerList(val: ILedger[]) {
    ledgerStore.ledgerList = val;
  },
  setCurrentLedger(val: ILedger) {
    ledgerStore.currentLedger = val;
  },
};
