import {
  Notify, Toast
} from "@antmjs/vantui";
import { OpenData, View } from "@tarojs/components";
import { useEffect } from "react";
import { getUserProfile } from "src/apis/user";
import { userStore } from "src/stores";
import { actionsUserStore } from "src/stores/user";
import { hideLoading, loading, toast } from "src/utils/toast";
import { useSnapshot } from "valtio";
import "./index.less";

export default function MyInfo() {
  const snap = useSnapshot(userStore);

  const apiGetUserProfile = async () => {
    try {
      loading();
      const res = await getUserProfile();
      hideLoading();
      if (res.data.code === 0) {
        res.data.data && actionsUserStore.initUserStore(res.data.data);
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
        {snap?.userId && <View className="info-item">{snap.userId}</View>}
        {snap?.userName && <View className="info-item">{snap.userName}</View>}
        {snap?.phone && <View className="info-item">{snap.phone}</View>}
        {snap?.email && <View className="info-item">{snap.email}</View>}
      </View>
      <Toast />
      <Notify />
    </>
  );
}
