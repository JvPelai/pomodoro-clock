const timerDisplay = document.querySelector('#timer');
const pauseTimer = document.querySelector('.pause');
let timeOptions = document.querySelectorAll("#sessionTime");

const timer =  {
    minutes: 0,
    seconds: 0,
    pauseSelected: false,
}


//gets the session time selected value
function seshTime(){
    let sessionTime = document.getElementById("sessionTime");
    let time = sessionTime.options[sessionTime.selectedIndex].value;
    timeOptions = document.querySelectorAll("#sessionTime");
    timerDisplay.textContent = time+":00";
    return time;
}


for(timeOption of timeOptions){
    timeOption.addEventListener('click',() => {
        let time = seshTime();
        timer.minutes = time;
    });
}

//gets the break time selected value
function brkTime(){
    let breaktime = document.getElementById("breakTime");
    let brk = breakTime.options[breakTime.selectedIndex].value;
    breakTimeOptions = document.querySelectorAll("#breakTime");
    return brk

}

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