import { mathCalculate } from "./calculate";
test('+', () => {
    expect(mathCalculate(1, 2, '+')).toBe(3);
    expect(mathCalculate(.1, .2, '+')).toBe(.3);
    expect(mathCalculate(1, 0, '+')).toBe(1);

});

test('-', () => {
    expect(mathCalculate(.3, .2, '-')).toBe(.1);
    expect(mathCalculate(3, 2, '-')).toBe(1);
    expect(mathCalculate(3, 0, '-')).toBe(3);

});

test('*', () => {
    expect(mathCalculate(.1, .2, '*')).toBe(.02);
    expect(mathCalculate(1, 2, '*')).toBe(2);
    expect(mathCalculate(1, 0, '*')).toBe(0);
});

test('/', () => {
    expect(mathCalculate(.1, 3, '/')).toBe(.03);
    expect(mathCalculate(1, 2, '/')).toBe(.5);
    expect(mathCalculate(1, 0, '/')).toBe(0);
});