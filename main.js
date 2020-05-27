const timerDisplay = document.querySelector('#timer');
const pauseTimer = document.querySelector('.pause');
const startTimer = document.querySelector('.startTimer');
const stopTimer = document.querySelector('.stop');
let timeOptions = document.querySelectorAll("#sessionTime");
timerDisplay.textContent = (sessionTime.options[sessionTime.selectedIndex].value)+":00"

let timer =  {
    selectedSessionMinutes: sessionTime.options[sessionTime.selectedIndex].value,
    selectedBreakMinutes: breakTime.options[breakTime.selectedIndex].value,
    minutes: sessionTime.options[sessionTime.selectedIndex].value,
    seconds: 0,
    pauseSelected: false,
    stopSelected: false,
    sessionGoing: false,
    sessionFinished: false,
    breakGoing: false,
}

//gets the session time selected value
function seshTime(){
    let sessionTime = document.getElementById("sessionTime");
    let time = sessionTime.options[sessionTime.selectedIndex].value;
    timeOptions = document.querySelectorAll("#sessionTime");
    timer.minutes = time;
    timer.seconds = 0;
    timerDisplay.textContent = time+":00";
    return time;
}


for(timeOption of timeOptions){
    timeOption.addEventListener('click',() => {
        let time = seshTime();
        timer.selectedSessionMinutes = time;
    });
}

//gets the break time selected value
function brkTime(){
    let breaktime = document.getElementById("breakTime");
    let brk = breakTime.options[breakTime.selectedIndex].value;
    breakTimeOptions = document.querySelectorAll("#breakTime");
    return brk
}

let breakTimeOptions = document.querySelectorAll("#breakTime");

for(timeOption of breakTimeOptions){
    timeOption.addEventListener('click',() => {
        let time = brkTime();
        timer.selectedBreakMinutes = time;
    });
}


startTimer.addEventListener('click', () => handleStart());
pauseTimer.addEventListener('click', (e) => handlePause(e));
stopTimer.addEventListener('click', () => handleStop());


function handleStart() {
    startTimer.disabled = true;
    for(timeOption of timeOptions){
        timeOption.disabled = true;
    }
    if(!timer.stopSelected){
        count();
    } else {
        timer.stopSelected = false;
        count();
        return;
    }

    if (timer.sessionFinished) {
        timer.breakGoing = true;
        return;
    }
    
    timer.sessionGoing = true;
    

}

function handlePause(e) {
    let {pauseSelected} = timer;
    if (!pauseSelected) {
        timer.pauseSelected = true;
        e.target.textContent = 'Play';
        console.log(timer.pauseSelected);
    } else {
        timer.pauseSelected = false;
        e.target.textContent = 'Pause';
        count();
    }
}

function handleStop() {
    let {stopSelected} = timer;
    if (!stopSelected) {
        timer.stopSelected = true;
        timer.minutes = (timer.breakGoing) ? timer.selectedBreakMinutes : timer.selectedSessionMinutes;
        timer.seconds = 0;
        timerDisplay.textContent = `${timer.minutes}:00`;
    }
    startTimer.disabled = false;
    for(timeOption of timeOptions){
        timeOption.disabled = false;
    }

    console.log(timer.stopSelected);
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
    let countdown = setInterval(function () {
        if (timer.pauseSelected == true || timer.stopSelected == true) {
            clearInterval(countdown);
        } else if (timer.minutes == 0 && timer.seconds == 0) {
            clearInterval(countdown);
            if (timer.breakGoing) {
                timer.breakGoing = false;
                timer.sessionFinished = false;
                timer.minutes = timer.selectedSessionMinutes;
                timerDisplay.textContent = `${timer.selectedSessionMinutes}:00`;
                handleStart();
            } else {
                timer.breakGoing = true;
                timer.sessionFinished = true;
                timer.minutes = timer.selectedBreakMinutes;
                timerDisplay.textContent = `${timer.selectedBreakMinutes}:00`;
                handleStart();
            }
        } else {
            displayTime();
        }
    }, 1000);
}
