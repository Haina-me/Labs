const { dayGenerator } = require("labs");

const weekend = dayGenerator();

const timerId = setInterval(() => {
    console.log(weekend.next().value);
}, 2000);

setTimeout(() => {
    clearInterval(timerId);
}, 10000);