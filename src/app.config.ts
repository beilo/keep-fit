import { ROUTE_PATHS } from "./router";

export default defineAppConfig({
  pages: [ROUTE_PATHS.home[0], ROUTE_PATHS.aa[0]],
  subpackages: [
    {
      root: "module-user",
      pages: [ROUTE_PATHS["my-info"][0]],
    },
    {
      root: "module-bill",
      pages: [ROUTE_PATHS["add-bill"][0]],
    },
    {
      root: "module-ledger",
      pages: [
        ROUTE_PATHS["ledger-list"][0],
        ROUTE_PATHS["add-ledger-user"][0],
        ROUTE_PATHS["empty-ledger"][0],
      ],
    },
    {
      root: "module-carb",
      pages: [ROUTE_PATHS.carb[0]],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
