const startTimer = document.querySelector('.startTimer');
const timerDisplay = document.querySelector('#timer');

//gets the session time selected value
function seshTime(){
    let sessionTime = document.getElementById("sessionTime");
    let time = sessionTime.options[sessionTime.selectedIndex].value;
    timeOptions = document.querySelectorAll("#sessionTime");
    return time
}

//gets the break time selected value
function brkTime(){
    let breaktime = document.getElementById("breakTime");
    let brk = breakTime.options[breakTime.selectedIndex].value;
    breakTimeOptions = document.querySelectorAll("#breakTime");
    return brk

}
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

function count(time) {
    if (timer.minutes == 0 && timer.seconds == 0) {
        return;
    } else {
        setInterval(displayTime(timer.seconds, timer.minutes), 1000);
    }
}