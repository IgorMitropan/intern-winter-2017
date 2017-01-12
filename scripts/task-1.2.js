'use strict';

const precision = 0.0001;

let result = sum(precision).toFixed(4);

document.getElementById('result').innerHTML = result;

function sum(precision) {
    let result = 0;
    let powMinusOne = pow(-1);
    let diff = 1;

    for (let k = 1; diff > precision ;k++) {
        diff = powMinusOne(k) * (2 * k + 1) / factorial(k);
        result += diff;
    }

    return result;
}

function pow(number) {
    return function (power) {
            let result = power ? number : 1;
            for (let i = 1; i <= power; i++) {
                result *= result;
            }

            return result;
        };   
}

function factorial(arg) {
    let result;
    if (arg > 0) {
        result = 1;
    }

    for (let i = 2; i <= arg; i++) {
        result *= i;
    }

    return result;
}