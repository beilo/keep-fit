import {chain, evaluate} from 'mathjs'

function toNumber(num: any): number {
    try {
        let _num = Number(num);
        if (isNaN(_num)) {
            throw new Error("toNumber isNaN")
        }
        return _num;
    } catch (e) {
        return 0;
    }
}

export function mathCalculate(num1: any, num2: any, unit: '+' | "-" | "*" | "/") {
    let _num1 = toNumber(num1);
    let _num2 = toNumber(num2);
    return toNumber(chain(evaluate(`${_num1} ${unit} ${_num2}`)).format({notation: 'fixed', precision: 2}).done());
}

export function calculateAllAmount(sumPrice: number, average: number, numbers: number[]) {
    const amountArr: number[] = [];
    let isPushSum = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (i === numbers.length - 1) {
            amountArr.push(mathCalculate(sumPrice, isPushSum, '-'));
        } else {
            let _price = mathCalculate(numbers[i], average, '*');
            isPushSum = mathCalculate(isPushSum, _price, '+');
            amountArr.push(_price)
        }
    }
    return amountArr;
}