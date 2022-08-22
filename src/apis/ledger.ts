import { Http } from ".";

export const getLedgerList = async (data: IGetLedgerParams) => {
  return Http.post<IApiModal<ILedger>>("/ledger/find", data);
};

export const addLedger = async (name: string) => {
  return Http.post<IApiModal<{ ledgerId: number }>>("/ledger/create", { name });
};

export const delLedger = async (ledgerId: number) => {
  return Http.post<IApiModal<any>>("/ledger/delete", { ledgerId });
};
