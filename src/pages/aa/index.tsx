import {
    ActionSheet,
    Button,
    Cell,
    CellGroup,
    Field,
    Grid,
    GridItem,
    Stepper
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { observer, useLocalStore } from "mobx-react";
import { Popup } from '@antmjs/vantui'


import styl from './index.module.less'

function AA() {

    return <>
        <View>
            <CellGroup>
                <Cell title="其他" label="07/23 22:36 饭+菜" border={false}
                    renderExtra={
                        <><View className="price">18.5</View>
                            <View className="number-people">2人消费</View></>
                    }
                />
            </CellGroup>
        </View>
        <View className={styl.btnAdd}>
            <View className={styl.btnAddLine}></View>
            <View className={styl.btnAddRow}></View>
        </View>

        <Popup show={true} position={'bottom'}>
            
        </Popup>
    </>
}

export default observer(AA);