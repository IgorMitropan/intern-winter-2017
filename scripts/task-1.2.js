var precision = 0.0001;
var result = sum(precision).toFixed(4);
document.getElementById('result').innerHTML = result;
function sum(precision) {
    var result = 0;
    var powMinusOne = pow(-1);
    var diff = 1;
    for (var k = 1; Math.abs(diff) > precision; k++) {
        diff = powMinusOne(k) * (2 * k + 1) / factorial(k);
        result += diff;
    }
    return result;
}
function pow(num) {
    return function (power) {
        return Math.pow(num, power);
    };
}
function factorial(arg) {
    var result;
    if (arg > 0) {
        result = 1;
    }
    for (var i = 2; i <= arg; i++) {
        result *= i;
    }
    return result;
}
