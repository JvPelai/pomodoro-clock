const startTimer = document.querySelector('.startTimer');
const timerDisplay = document.querySelector('#timer');

const timer =  {
    seconds: 0,
    minutes: 10,
}

function handleTime (sec, min) {
    console.log(timer);
    if (sec == 0) {
        sec = 59;
        min--;
    } else {
        sec--;
    }
}

function displayTime(sec, min) {
    handleTime(sec, min);
    console.log(timer);
    secString = (sec < 10) ? `0${sec.toString()}` : sec.toString();
    minString = min.toString();
    console.log(timer);
    console.log(minString + secString);
    timerDisplay.textContent = `${minString}:${secString}`;
}

function count() {
    if (timer.minutes == 0 && timer.seconds == 0) {
        return;
    } else {
        setInterval(displayTime(timer.seconds, timer.minutes), 1000);
    }
}