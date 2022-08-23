import { Notify, Toast } from "@antmjs/vantui";
export const loading = (msg: string = "...") => {
  Toast.loading(msg);
};
export const hideLoading = () => {
  Toast.clear();
};

export const toast = {
  success(msg: string) {
    Notify.show({
      message: msg,
      type: "success",
    });
  },
  error(msg: string) {
    Notify.show({
      message: msg,
      type: "danger",
    });
  },
};
