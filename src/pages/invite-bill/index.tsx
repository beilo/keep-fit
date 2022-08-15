import { Cell, CellGroup, Checkbox, Field, Stepper, Button } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Immutable, produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { ROUTE_PATHS } from "src/router";
import { Row, Col } from '@antmjs/vantui'
import './index.less'

export default function InviteBill() {

    return (
        <View className="invite-bill">
            <View className="wrap">
                <View className="title">是否接受《xxx》账单的邀请</View>
                <Field className="mt-24" value={''} placeholder='请输入账单id,10分钟内有效'/>
                <Button plain hairline type="primary" className="mt-24">
                    接受
                </Button>
            </View>
        </View>
    )
}