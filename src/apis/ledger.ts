import { Http } from ".";

export const getLedgerList = async (data: IGetLedgerParams) => {
  return Http.post<IApiModal<ILedger>>("/ledger/find", data, {
    headers: {
      "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
      "Content-Type": "application/json",
    },
  });
};
