import { Http } from ".";

export const apiWxLogin = async (code: string) => {
  return Http.post<IApiModal<IUser>>("/user/loginByWeixin", { code });
};

export const getUserProfile = () => {
  return Http.post<IApiModal<IUser>>("/user/profile");
};

export const userUpdate = (userName: string) => {
  return Http.post<IApiModal<any>>("/user/update", { userName });
};

export const loginout = () => {
  return Http.post<IApiModal<any>>("/user/logout");
};
