import {
  Cell,
  CellGroup,
  Checkbox,
  Field,
  Stepper,
  Button,
  Dialog,
  Toast,
  Notify,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Immutable, produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { ROUTE_PATHS } from "src/router";
import { Row, Col, Tag } from "@antmjs/vantui";
import "./index.less";
import { ledgerSettleAll, ledgerSettlePlan } from "src/apis/ledger";
import { ledgerStore } from "src/stores/ledger";
import { hideLoading, loading, toast } from "src/utils/toast";

export default function EmptyLedger() {
  const [data, setData] = useState<ILedgerSettlePlan[]>([]);
  const [visDialog, setVisDialog] = useState(false);

  useEffect(() => {
    apiLedgerSettlePlan();
  }, []);
  const apiLedgerSettlePlan = async () => {
    try {
      loading();
      const { data } = await ledgerSettlePlan(
        ledgerStore.currentLedger?.ledgerId || 0
      );
      hideLoading();
      if (data.code === 0) {
        setData(data.data || []);
        return;
      }
      throw new Error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const apiLedgerSettleAll = async () => {
    try {
      loading();
      const { data } = await ledgerSettleAll(
        ledgerStore.currentLedger?.ledgerId || 0
      );
      hideLoading();
      if (data.code === 0) {
        toast.success("清账成功");
        return;
      }
      throw new Error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <View className="empty-ledger">
      <CellGroup inset className="tab-wrap">
        {data.map((ledgerSettlePlan) => {
          return (
            <Row className="row-wrap">
              <Col span="10">
                {ledgerSettlePlan.from.userName} <Tag type="danger">支付</Tag>
              </Col>
              <Col span="10">
                {ledgerSettlePlan.to.userName} <Tag type="success">收取</Tag>
              </Col>
              <Col span="4">{ledgerSettlePlan.amount}</Col>
            </Row>
          );
        })}
      </CellGroup>
      <View className="btn-wrap">
        <Button type="default">微信分享</Button>
        <Button type="danger" onClick={() => setVisDialog(true)}>
          完成结算
        </Button>
      </View>
      <Dialog
        id="vanDialog3"
        title="警告"
        showCancelButton
        showConfirmButton
        show={visDialog}
        onClose={() => {
          setVisDialog(false);
        }}
        onConfirm={apiLedgerSettleAll}
        message="是否全员清账"
      />
      <Toast />
      <Notify />
    </View>
  );
}
