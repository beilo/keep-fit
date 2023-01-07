
import {
    Cell,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import dayjs from "dayjs";
import styles from '../../index.module.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type TOnItemClick = (bill: IBill) => void
const BillList = ({ data, onItemClick }: { data: IBill[], onItemClick: TOnItemClick }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }
    return <>
        {data.map(item => <Bill key={item.billId} data={item} onItemClick={onItemClick} />)}
    </>
}
const Bill = ({ data, onItemClick }: { data: IBill, onItemClick: TOnItemClick }) => {
    const payers = data.payers;
    let payerText = payers?.[0]?.userName || "";
    if (payerText && payers.length > 1) {
        payerText = payers.length + "人";
    }
    payerText && (payerText += "付款");
    return <Cell
        key={data.billId}
        title={data.remarks || data.categoryName}
        label={dayjs(data.billTime).format("YYYY-MM-DD HH:mm")}
        border={true}
        onClick={() => {
            onItemClick(data)
        }}
        renderExtra={
            <View>
                <View className={cx("price")}>{data.billAmount}</View>
                <View className={cx("number-people")}>
                    {data.participants?.length || 0}人消费，{payerText}
                </View>
            </View>
        }
    />
}

export default BillList;