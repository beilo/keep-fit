import { ROUTE_PATHS } from "./router";

export default defineAppConfig({
  pages: [
    ROUTE_PATHS["my-info"],
    ROUTE_PATHS.home,
    ROUTE_PATHS.aa,
    ROUTE_PATHS["ledger-list"],
    ROUTE_PATHS["invite-bill"],
    ROUTE_PATHS["empty-bill"],
    ROUTE_PATHS["add-bill"],

    ROUTE_PATHS.carb,
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  lazyCodeLoading: "requiredComponents",
});