import {
    Cell,
    CellGroup,
    Checkbox,
    Notify,
    Stepper,
    Toast,
} from "@antmjs/vantui";
import { View } from "@tarojs/components";
import { useEffect, useMemo, useRef } from "react";
import { ROUTE_PATHS } from "src/router";

import "./index.less";
import dayjs from "dayjs";
import { addBill, updateBill } from "src/apis/bill";
import { userStore } from "src/stores";
import { ledgerStore } from "src/stores/ledger";
import { getPathParams, redirectTo } from "src/utils/navigate";
import { hideLoading, loading, toast } from "src/utils/toast";
import { proxy, useSnapshot } from "valtio";
import RemarkInput from "./components/remark-input";
import { mathCalculate } from "src/utils/calculate";

type IStateUser = IUser & {
    isPay: boolean;
    payPrice: number;
    isTakePart: boolean;
    copiesNumber: number;
};
function calculateAllAmount(sumPrice: number, average: number, users: IStateUser[], lastTakePartUser: IStateUser | undefined) {
    const amountArr: number[] = [];
    let isPushSum = 0;
    users.forEach(it => {
        if (it.userId === lastTakePartUser?.userId) {
            amountArr.push(mathCalculate(sumPrice, isPushSum, '-'));
        } else if (it.isTakePart) {
            let _price = mathCalculate(it.copiesNumber, average, '*');
            isPushSum = mathCalculate(isPushSum, _price, '+');
            amountArr.push(_price)
        } else {
            amountArr.push(0)
        }
    })
    return amountArr;
}

export default function AddBill() {
    const state = useRef(
        proxy(
            new (class State {
                visPay = false;
                visTakePart = true;
                users: IStateUser[] = [];
                currentUser = 0;
                remarks = "";
            })()
        )
    ).current;
    const snap = useSnapshot(state);
    const pathParams = getPathParams();
    const billRef = useRef<IBill | null>(null);

    useEffect(() => {
        let bill = (billRef.current = pathParams?.bill
            ? JSON.parse(pathParams.bill)
            : null);
        const isEdit = bill ? true : false;
        const userIdToIndexMap = new Map();
        const initUser = ledgerStore.currentLedger?.members.map((user, idx) => {
            userIdToIndexMap.set(user.userId, idx);
            return {
                ...user,
                isPay: false,
                payPrice: 0,
                isTakePart: isEdit ? false : true,
                copiesNumber: 1,
            };
        });
        if (!initUser) return;
        if (isEdit) {
            bill.payers?.forEach((user, idx) => {
                if (idx === 0) {
                    state.currentUser = user.userId;
                }
                const initUserPants = initUser[userIdToIndexMap.get(user.userId)];
                initUserPants.isPay = true;
                initUserPants.payPrice = user.amount || 0;
            });
            bill.participants?.forEach((user) => {
                const userIdx = userIdToIndexMap.get(user.userId);
                initUser[userIdx].copiesNumber = user.copiesNumber;
                initUser[userIdx].isTakePart = true;
            });
            state.remarks = bill.remarks;
        } else {
            state.currentUser = userStore.userId;
            initUser[userIdToIndexMap.get(state.currentUser)].isPay = true;
        }
        state.users = initUser;
    }, []);

    const { sumPrice, takePartAmounts } = useMemo(() => {
        let sumPrice = 0;
        let takePartLength = 0;
        let lastUser: IStateUser | undefined;
        state.users.forEach((user) => {
            if (user.isPay) {
                sumPrice += Number(user.payPrice);
            }
            if (user.isTakePart) {
                takePartLength += user.copiesNumber;
                lastUser = user;
            }
        });
        const _sumPrice = String(sumPrice);
        const _averagePrice = mathCalculate(sumPrice, takePartLength, '/');
        const _takePartAmounts = calculateAllAmount(Number(_sumPrice), _averagePrice, state.users, lastUser);
        return {
            sumPrice: _sumPrice,
            averagePrice: _averagePrice,
            takePartAmounts: _takePartAmounts
        };
    }, [snap.users]);

    // todo 时间

    const onSubmit = () => {
        const payers: any[] = [],
            participants: any[] = [];


        state.users.forEach((user, idx) => {
            user.isPay &&
                payers.push({
                    userId: user.userId,
                    userName: user.userName,
                    amount: Number(user.payPrice),
                });
            user.isTakePart &&
                participants.push({
                    userId: user.userId,
                    userName: user.userName,
                    amount: takePartAmounts[idx],
                    copiesNumber: user.copiesNumber,
                });
        });
        const param = {
            ledgerId: ledgerStore.currentLedger?.ledgerId || 0,
            billId: Number(billRef.current?.billId || 0),
            categoryId: 1,
            billAmount: Number(sumPrice),
            billTime: dayjs().toISOString(),
            remarks: state.remarks,
            payers,
            participants,
        };
        apiAddBill(param);
    };
    const apiAddBill = async (data: IAddBillParams) => {
        try {
            loading("新增中...");
            let api;
            if (data.billId) {
                api = updateBill;
                delete data.ledgerId;
            } else {
                api = addBill;
                delete data.billId;
            }
            const res = await api(data);
            hideLoading();
            if (res.data.code === 0) {
                toast.success("添加成功");
                return;
            }
            throw new Error(res.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const onDelete = () => {
        calculate(state.users, undefined);
    };
    const onInput = (value_) => {
        if (value_ === "关闭") {
            redirectTo({
                url: ROUTE_PATHS.aa,
            });
            return;
        }
        calculate(state.users, value_);
    };
    const onCheckbox = (e, user, type: "isPay" | "isTakePart") => {
        e.stopPropagation();
        const draft = state.users;
        const idx = draft.findIndex((_) => _.userId === user.userId);
        if (type === "isPay") {
            draft[idx].isPay = !user.isPay;
            state.currentUser = user.userId;
        } else if (type === "isTakePart") {
            draft[idx].isTakePart = !user.isTakePart;
        }
    };
    const onCopiesNumber = (user, copiesNumber) => {
        const draft = state.users;
        const idx = draft.findIndex((_) => _.userId === user.userId);
        draft[idx].copiesNumber = copiesNumber;
    };

    const calculate = (draft, value_) => {
        const idx = draft.findIndex((_) => _.userId === state.currentUser);
        const user = draft[idx];
        const price = String(user.payPrice || "");
        const _payPrice =
            value_ !== undefined ? price + value_ : price.slice(0, price.length - 1);
        user.payPrice = _payPrice;
    };
    return (
        <View className="popup-add-bill">
            <View className="top_wrap">
                <CellGroup title="消费" inset>
                    <Cell title="日常" border={false} value={sumPrice} />
                </CellGroup>
                <View
                    className="van-cell-group__title van-cell-group__title--inset"
                    onClick={() => {
                        state.visPay = !state.visPay;
                    }}
                >
                    {`付款人${snap.visPay ? "↗" : "↘"}`}
                </View>
                <CellGroup inset>
                    {snap.users.map((user,) => {
                        if (
                            !snap.visPay &&
                            user.userId !== state.currentUser &&
                            !user.isPay
                        )
                            return null;
                        return (
                            <Cell
                                className={
                                    snap.currentUser === user.userId ? "check-pay-wrap" : ""
                                }
                                key={user.userId}
                                border={false}
                                renderTitle={
                                    <Checkbox
                                        value={user.isPay}
                                        onClick={(e) => {
                                            onCheckbox(e, user, "isPay");
                                        }}
                                    >
                                        {user.userName}
                                    </Checkbox>
                                }
                                renderExtra={
                                    <View
                                        className="pay-value"
                                        onClick={() => {
                                            state.currentUser = user.userId;
                                        }}
                                    >
                                        {user.payPrice || 0}
                                    </View>
                                }
                            />
                        );
                    })}
                </CellGroup>
                <View
                    className="van-cell-group__title van-cell-group__title--inset"
                    onClick={() => {
                        state.visTakePart = !state.visTakePart;
                    }}
                >
                    {`参与人${snap.visTakePart ? "↗" : "↘"}`}
                </View>
                <CellGroup inset>
                    {snap.users.map((user, idx) => {
                        if (!snap.visTakePart && idx !== 0) return null;
                        return (
                            <Cell
                                key={user.userId}
                                border={false}
                                value={user.isTakePart ? takePartAmounts[idx] : 0}
                                renderTitle={
                                    <View className="take-part_wrap">
                                        <Checkbox
                                            className="take-part_wrap-checkbox"
                                            value={user.isTakePart}
                                            onClick={(e) => {
                                                onCheckbox(e, user, "isTakePart");
                                            }}
                                        >
                                            {user.userName}
                                        </Checkbox>
                                        <Stepper
                                            className="take-part_wrap-step"
                                            value={user.copiesNumber}
                                            integer
                                            min={1}
                                            onChange={(e) => {
                                                onCopiesNumber(user, e.detail);
                                            }}
                                        />
                                    </View>
                                }
                            />
                        );
                    })}
                </CellGroup>
            </View>
            <RemarkInput
                remarks={snap.remarks}
                onChangeRemarks={(e) => {
                    state.remarks = e.detail;
                }}
                onInput={onInput}
                onDelete={onDelete}
                onSubmit={onSubmit}
            />
            <Toast />
            <Notify />
        </View>
    );
}
