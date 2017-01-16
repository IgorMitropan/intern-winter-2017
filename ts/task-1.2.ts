const precision: number = 0.0001;

let result: string = sum(precision).toFixed(4);

document.getElementById('result').innerHTML = result;

function sum(precision: number): number {
    let result: number = 0;
    let powMinusOne: Function = pow(-1);
    let diff: number = 1;

    for (let k = 1; Math.abs(diff) > precision; k++) {
        diff = powMinusOne(k) * (2 * k + 1) / factorial(k);
        result += diff;
    }

    return result;
}

function pow(num: number): Function {
    return function (power: number): number {
            return Math.pow(num, power);
        };   
}

function factorial(arg: number): number {
    let result: number;
    if (arg > 0) {
        result = 1;
    }

    for (let i = 2; i <= arg; i++) {
        result *= i;
    }

    return result;
}