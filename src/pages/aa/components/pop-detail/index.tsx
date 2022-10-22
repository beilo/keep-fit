import { Button, Cell, CellGroup, Popup } from '@antmjs/vantui'
import { View } from '@tarojs/components';
import classnames from 'classnames/bind'
import styles from './index.module.less'
const cx = classnames.bind(styles);

interface IProps {
    bill: IBill | undefined,
    vis: boolean;
    onClose: () => void
    onDel: () => void;
    onEdit: () => void
}
export function PopDetail({
    bill, vis, onClose, onDel, onEdit
}: IProps) {

    return <Popup show={vis} position='bottom' round safeAreaInsetBottom onClose={onClose}>
        <View className={cx('wrap')}>
            <CellGroup title="消费" inset>
                <Cell title="日常" border={false} value={bill?.billAmount || 0} />
            </CellGroup>
            <CellGroup title='付款人' inset>
                {bill?.payers?.map(it => {
                    return <Cell
                        border={false}
                        title={it.userName}
                        value={it.amount}
                    />
                })}
            </CellGroup>
            <CellGroup title='参与人' inset>
                {bill?.participants?.map(it => {
                    return <Cell
                        border={false}
                        title={`${it.userName} 等 ${it.copiesNumber}人`}
                        value={it.amount}
                    />
                })}
            </CellGroup>
            {bill?.remarks && <CellGroup title='备注' inset>
                <Cell
                    border={false}
                    title={bill.remarks}
                />
            </CellGroup>}

            <View className={cx('btn-wrap')}>
                <Button className={cx('btn')} type="danger" plain onClick={onDel}>删除</Button>
                <Button className={cx('btn')} type="primary" plain onClick={onEdit}>编辑</Button>
            </View>
        </View>
    </Popup >
}