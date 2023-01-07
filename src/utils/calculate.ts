// import { chain, evaluate } from 'mathjs'
import Big from 'big.js';

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

// export function mathCalculate(num1: any, num2: any, unit: '+' | "-" | "*" | "/") {
//     let _num1 = toNumber(num1);
//     let _num2 = toNumber(num2);
//     return toNumber(chain(evaluate(`${_num1} ${unit} ${_num2}`)).format({ notation: 'fixed', precision: 2 }).done());
// }

export function mathCalculate(num1: any, num2: any, unit: '+' | "-" | "*" | "/") {
    let _num1 = Big(toNumber(num1));
    let _num2 = Big(toNumber(num2));
    let res: Big | null;
    switch (unit) {
        case '+':
            res = _num1.plus(_num2)
            break;
        case '-':
            res = _num1.minus(_num2)
            break;
        case '*':
            res = _num1.times(_num2)
            break;
        case '/':
            if (Number(_num2) === 0) {
                res = Big(0);
            } else {
                res = _num1.div(_num2)
            }
            break;
        default:
            res = Big(0);
            break;
    }
    return res.toFixed(2);
}