function getNextDay(currentDay) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currentIndex = daysOfWeek.indexOf(currentDay);
    return daysOfWeek[(currentIndex + 1) % daysOfWeek.length];
}

module.exports = { getNextDay };