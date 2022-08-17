import { Http } from ".";

export const getLedgerList = async (data: IGetLedgerParams) => {
  return Http.post<IApiModal<ILedger>>("/ledger/find", data, {
    headers: {
      "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
      "Content-Type": "application/json",
    },
  });
};

export const addLedger = async (name: string) => {
  return Http.post<IApiModal<{ ledgerId: number }>>(
    "/ledger/create",
    { name },
    {
      headers: {
        "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
        "Content-Type": "application/json",
      },
    }
  );
};

export const delLedger = async (ledgerId: number) => {
  return Http.post<IApiModal<any>>(
    "/ledger/delete",
    { ledgerId },
    {
      headers: {
        "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
        "Content-Type": "application/json",
      },
    }
  );
};
