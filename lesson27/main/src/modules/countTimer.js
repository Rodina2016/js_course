// Таймер
function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime();
        const dateNow = new Date().getTime();
        const timeRemaining = (dateStop - dateNow) / 1000;
        let seconds = Math.floor(timeRemaining % 60) < 0 ? 0 : Math.floor(timeRemaining % 60);
        let minutes = Math.floor((timeRemaining / 60) % 60) < 0 ? 0 : Math.floor((timeRemaining / 60) % 60);
        let hours = Math.floor(timeRemaining / 60 / 60) < 0 ? 0 : Math.floor(timeRemaining / 60 / 60);

        function formateNumber(number) {
            number = String(number);
            if (number.length < 2) {
                return '0' + number;
            } else {
                return number;
            }
        }

        hours = formateNumber(hours);
        minutes = formateNumber(minutes);
        seconds = formateNumber(seconds);

        return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
        const timer = getTimeRemaining();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if (timer.timeRemaining < 0) {
            clearInterval(idInterval);
        }
    }

    const idInterval = setInterval(updateClock, 1000);
}

export default countTimer;