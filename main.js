const timerDisplay = document.querySelector('#timer');

const btnArr = document.getElementsByTagName('button');
const startTimer = btnArr[0];
const pauseTimer = btnArr[1];
const stopTimer = btnArr[2];

const breakSelect = document.getElementById('breakSelect');
let breakMin = breakSelect.value.split(':')[0];
let breakSec = breakSelect.value.split(':')[1];

let timer =  {
    minutes: 1,
    seconds: 0,
    pauseSelected: false,
};

startTimer.addEventListener('click', () => count());
pauseTimer.addEventListener('click', (e) => handlePause(e));

function handlePause(e) {
    let {pauseSelected} = timer;
    if (!pauseSelected) {
        timer.pauseSelected = true;
        e.target.textContent = 'play';
    } else {
        timer.pauseSelected = false;
        e.target.textContent = 'pause';
    }
}

function handleTime() {
    let {minutes, seconds} = timer;
    if (seconds == 0) {
        timer.seconds = 59;
        timer.minutes--;
    } else {
        timer.seconds--;
    }
}

function displayTime() {
    console.log(timer);
    handleTime();
    console.log(timer);
    let {minutes, seconds} = timer;
    let minString = minutes.toString();
    let secString = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString();
    console.log(minString, secString);
    timerDisplay.textContent = `${minString}:${secString}`;
}

function count() {
    setInterval(function () {
        if ((timer.minutes == 0 && timer.seconds == 0) ||
        timer.pauseSelected == true) return;   
        displayTime();
    }, 1000);
}