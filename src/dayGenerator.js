const { getNextDay } = require("./getNextDay");

function* dayGenerator() {
    let day = "Monday";
    while (true) {
        yield day;
        day = getNextDay(day);
    }
}

module.exports = { dayGenerator };