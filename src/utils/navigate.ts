import Taro, { EventChannel } from "@tarojs/taro";

interface Option {
  /** 需要跳转的应用内非 tabBar 的页面的路径, 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如 'path?key=value&key2=value2' */
  url: string;
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: TaroGeneral.CallbackResult) => void;
  /** 页面间通信接口，用于监听被打开页面发送到当前页面的数据。 */
  events?: TaroGeneral.IAnyObject;
  /** 接口调用失败的回调函数 */
  fail?: (res: TaroGeneral.CallbackResult) => void;
  /** 接口调用成功的回调函数 */
  success?: (
    res: TaroGeneral.CallbackResult & { eventChannel: EventChannel }
  ) => void;
}

type TOption = Omit<Option, "url"> & { url: string | string[] };
const handleUrl = (url: TOption["url"]) => {
  if (Array.isArray(url)) {
    if (url.length > 1) return `/${url[1]}/${url[0]}`;
    return `/${url[0]}`;
  }
  return `/${url}`;
};
export const navigateTo = (opt: TOption) => {
  Taro.navigateTo({ ...opt, url: handleUrl(opt.url) });
};

export const redirectTo = (opt: TOption) => {
  Taro.redirectTo({ ...opt, url: handleUrl(opt.url) });
};

interface INavigateBackOption {
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: TaroGeneral.CallbackResult) => void;
  /** 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
  delta?: number;
  /** 接口调用失败的回调函数 */
  fail?: (res: TaroGeneral.CallbackResult) => void;
  /** 接口调用成功的回调函数 */
  success?: (res: TaroGeneral.CallbackResult) => void;
}
export const navigateBack = (opt: INavigateBackOption) => {
  Taro.navigateBack(opt);
};

export const getPathParams = () => {
  return Taro.getCurrentInstance().router?.params;
};

export const addRouterParams = (url: TOption["url"], params: any) => {
  let _url = [...url];
  for (const key in params) {
    if (_url[0].indexOf("?")) {
      _url[0] += "?";
    }
    _url[0] = `${_url[0]}&${key}=${params[key]}`;
  }
  console.log(_url);
  return _url;
};
