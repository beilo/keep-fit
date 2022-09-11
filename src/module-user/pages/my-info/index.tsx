import { Dialog, Notify, Toast } from "@antmjs/vantui";
import { Input, OpenData, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getUserProfile, loginout, userUpdate } from "src/apis/user";
import { ROUTE_PATHS } from "src/router";
import { userStore } from "src/stores";
import * as user from "src/stores/user";
import { redirectTo } from "src/utils/navigate";
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
        res.data.data && user.actionsUserStore.initUserStore(res.data.data);
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

  const [tempUserName, setTempUserName] = useState("");
  const [visUserModal, setVisUserModal] = useState(false);
  const apiUserUpdate = async (userName: string) => {
    try {
      loading();
      const res = await userUpdate(userName);
      hideLoading();
      if (res.data.code === 0) {
        user.actionsUserStore.setUserName(userName);
        redirectTo({ url: ROUTE_PATHS["ledger-list"] });
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const apiLoginout = async () => {
    try {
      loading();
      const res = await loginout();
      hideLoading();
      if (res.data.code === 0) {
        user.actionsUserStore.initUserStore({} as IUser);
        toast.success("退出登录成功");
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <View className="my-info">
        <View className="info-item">
          <View className="avatar">
            <OpenData type="userAvatarUrl" />
          </View>
        </View>
        {snap?.userId && (
          <View className="info-item">
            <View className="info-label">用户ID</View>
            {snap.userId}
          </View>
        )}
        {snap?.userName && (
          <View
            className="info-item"
            onClick={() => {
              setVisUserModal(true);
            }}
          >
            <View className="info-label">昵称</View>
            {snap.userName}
          </View>
        )}
        {snap?.phone && (
          <View className="info-item">
            <View className="info-label">手机号码</View>
            {snap.phone}
          </View>
        )}
        {snap?.email && (
          <View className="info-item">
            <View className="info-label">email</View>
            {snap.email}
          </View>
        )}

        <View className="info-item" onClick={apiLoginout}>
          退出登录
        </View>
      </View>

      <Dialog
        title="修改用户名"
        showCancelButton
        show={visUserModal}
        onConfirm={() => {
          apiUserUpdate(tempUserName);
        }}
        onClose={() => setVisUserModal(false)}
      >
        <Input
          type="nickname"
          value={tempUserName}
          placeholder="请输入用户名"
          onInput={(e) => {
            setTempUserName(e.detail.value);
          }}
        />
      </Dialog>

      <Toast />
      <Notify />
    </>
  );
}
