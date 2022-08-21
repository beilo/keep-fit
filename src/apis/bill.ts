import { Http } from ".";

export const getBillList = async (data: IBillParams) => {
  return Http.post<IApiModal<IBill[]>>("/bill/find", data, {
    headers: {
      "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
      "Content-Type": "application/json",
    },
  });
};

export const delBill = async (billId: number) => {
  return Http.post<IApiModal<IBill[]>>(
    "/bill/delete",
    { billId },
    {
      headers: {
        "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
        "Content-Type": "application/json",
      },
    }
  );
};

export const addBill = (data: IAddBillParams) => {
  return Http.post<IApiModal<IBill[]>>("/bill/create", data, {
    headers: {
      "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
      "Content-Type": "application/json",
    },
  });
};
