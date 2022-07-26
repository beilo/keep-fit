import { Http } from ".";

export const getLedgerList = async (data: IGetLedgerParams) => {
  return Http.post<IApiModal<ILedger[]>>("/ledger/find", data);
};

export const addLedger = async (name: string) => {
  return Http.post<IApiModal<{ ledgerId: number }>>("/ledger/create", { name });
};

export const delLedger = async (ledgerId: number) => {
  return Http.post<IApiModal<any>>("/ledger/delete", { ledgerId });
};

export const getLedgerProfile = async (ledgerId: number) => {
  return Http.post<IApiModal<ILedgerProfile>>("/ledger/profile", { ledgerId });
};

export const getLedgerJoin = async (ledgerCode: string) => {
  return Http.post<IApiModal<ILedgerProfile>>("/ledger/join", { ledgerCode });
};

export const ledgerSettlePlan = async (ledgerId: number) => {
  return Http.post<IApiModal<ILedgerSettlePlan[]>>("/ledger/settlePlan", {
    ledgerId,
  });
};

export const ledgerSettleAll = async (ledgerId: number) => {
  return Http.post<IApiModal<any>>("/ledger/settleAll", {
    ledgerId,
  });
};
