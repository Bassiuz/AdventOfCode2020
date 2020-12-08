function startTimer() {
    const time = process.hrtime();
    return time;
}

function endTimer(time) {
    function roundTo(decimalPlaces, numberToRound) {
        return +(Math.round(numberToRound + `e+${decimalPlaces}`) + `e-${decimalPlaces}`);
    }
    const diff = process.hrtime(time);
    const NS_PER_SEC = 1e9;
    const result = (diff[0] * NS_PER_SEC + diff[1]); // Result in Nanoseconds
    const elapsed = result * 0.0000010;
    return roundTo(6, elapsed); // Result in milliseconds
}

module.exports = { startTimer, endTimer };