import { Cell, CellGroup, Checkbox, Field, Stepper, Button } from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Immutable, produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { ROUTE_PATHS } from "src/router";
import { Row, Col, Tag } from '@antmjs/vantui'
import './index.less'

export default function EmptyBill() {
    console.log(1);

    return (
        <View className="empty-bill">
            <CellGroup inset className="tab-wrap">
                <Row>
                    <Col span="10">
                        雷鹏 <Tag type="danger">支付</Tag>
                    </Col>
                    <Col span="10">
                        雷鹏1 <Tag type="success">收取</Tag>
                    </Col>
                    <Col span="4">
                        18.8
                    </Col>
                </Row>
            </CellGroup>
            <View className="btn-wrap">
                <Button type="default">
                    微信分享
                </Button>
                <Button type="danger">
                    完成结算
                </Button>
            </View>
        </View>
    )
}