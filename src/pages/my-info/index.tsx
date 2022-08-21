import {
  Button,
  Cell,
  Dialog,
  Field,
  Notify,
  SwipeCell,
  Toast,
} from "@antmjs/vantui";
import { View, Image, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import { addLedger, delLedger, getLedgerList } from "src/apis/ledger";
import { getUserProfile } from "src/apis/user";
import { ROUTE_PATHS } from "src/router";
import { navigateTo } from "src/utils/navigate";
import { hideLoading, loading, toast } from "src/utils/toast";
import { proxy, useSnapshot } from "valtio";
import "./index.less";

export default function MyInfo() {
  const state = useRef(
    proxy(
      new (class State {
        user?: IUser;
      })()
    )
  ).current;
  const snap = useSnapshot(state);

  const apiGetUserProfile = async () => {
    try {
      loading();
      const res = await getUserProfile();
      hideLoading();
      if (res.data.code === 0) {
        state.user = res.data.data;
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    apiGetUserProfile();
  }, []);

  return (
    <>
      <View className="my-info">
        <View className="info-item">
          <View className="avatar">
            <OpenData type="userAvatarUrl" />
          </View>
        </View>
        <View className="info-item">
          <OpenData type="userNickName" />
        </View>
        {snap.user ? (
          <>
            <View className="info-item">{snap.user?.userId || ""}</View>
            <View className="info-item">{snap.user?.userName || ""}</View>
            <View className="info-item">{snap.user?.phone || ""}</View>
            <View className="info-item">{snap.user?.email || ""}</View>
          </>
        ) : null}
      </View>
      <Toast />
      <Notify />
    </>
  );
}
