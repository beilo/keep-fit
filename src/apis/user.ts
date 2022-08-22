import { Http } from ".";

export const apiWxLogin = async (code: string) => {
  return Http.post<IApiModal<IUser>>("/user/loginByWeixin", { code });
};

export const getUserProfile = () => {
  return Http.post<IApiModal<IUser>>("/user/profile", null);
};
