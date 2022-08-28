import { Http } from ".";

export const getBillList = async (data: IBillParams) => {
  return Http.post<IApiModal<IBill[]>>("/bill/find", data);
};

export const delBill = async (billId: number) => {
  return Http.post<IApiModal<IBill[]>>("/bill/delete", { billId });
};

export const addBill = (data: IAddBillParams) => {
  return Http.post<IApiModal<IBill[]>>("/bill/create", data);
};

export const updateBill = async (
  data: Omit<IAddBillParams, "ledgerId"> & { billId: number }
) => {
  return Http.post<IApiModal<IBill[]>>("/bill/update", data);
};
