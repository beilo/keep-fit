import { Http } from ".";

export const apiWxLogin = async (code: string) => {
  return Http.post<IApiModal<any>>(
    "/wx/login",
    { code },
    {
      headers: {
        "User-Agent": "apifox/1.0.0 (https://www.apifox.cn)",
        "Content-Type": "application/json",
      },
    }
  );
};
