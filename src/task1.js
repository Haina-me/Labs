function* dayGenerator() {
    const fixed = new Date();
    let day = "Monday";
    while (true) {
        if (new Date() - fixed >= 10000) {
            break;
        }
        yield day;
        day = getNextDay(day);
    }
}

function getNextDay(currentDay) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currentIndex = daysOfWeek.indexOf(currentDay);
    return daysOfWeek[(currentIndex + 1) % daysOfWeek.length];
}

const weekend = dayGenerator();

const timerId = setInterval(() => {
    console.log(weekend.next().value);
}, 2000);

const timeout = setTimeout(() => {
    clearInterval(timerId);
}, 10000);


