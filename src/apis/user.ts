import { Http } from ".";

export const apiWxLogin = async (code: string) => {
  return Http.post<IApiModal<IUser>>(
    "/user/loginByWeixin",
    { code },
    {
      headers: {
        "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
        "Content-Type": "application/json",
      },
    }
  );
};

export const getUserProfile = () => {
  return Http.post<IApiModal<IUser>>("/user/profile", null, {
    headers: {
      "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
      "Content-Type": "application/json",
    },
  });
};
