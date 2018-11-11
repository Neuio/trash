// Timer
const buttons = document.querySelectorAll('[data-time]');
let form = document.forms['customForm'];
let inputText = form.elements['minutes'];

const timer = (function () {

    let countdown,
        timerDisplay,
        endTime,
        alarmSound;

    function init(settings) {
        timerDisplay = document.querySelector(settings.timeLeftSelector);
        endTime = document.querySelector(settings.timeEndSelector);

        if (settings.alarmSound) {
            alarmSound = new Audio(settings.alarmSound);
        };
    };

    function start(seconds) {
        if (!timerDisplay || !endTime) return console.log('Please init module first.');
        if (!seconds || typeof seconds !== 'number') return console.log('Please provide seconds.');

        // Reset timer
        clearInterval(countdown);
        // Reset sound
        alarmSound.pause();
        alarmSound.currentTime = 0;

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(then);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearInterval(countdown);
                playSound();
                return;
            };
            
            displayTimeLeft(secondsLeft);
        }, 1000);
    };

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const reminderSeconds = seconds % 60;
        
        const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        document.title = display;
        timerDisplay.textContent = display;
    };

    function displayEndTime(timestamp) {
        const end = new Date(timestamp);
        const hour = end.getHours();
        const minutes = end.getMinutes();

        endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    function stop() {

    };

    function playSound() {
        alarmSound.play();
    };

    return {
        init,
        start,
        stop
    };

}());

// Init timer
timer.init({
    timeLeftSelector: '.display__time-left',
    timeEndSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3'
});

//start timer by click
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer.start(seconds);
    console.log(this.dataset.time);
};

function startTimer2() {
    const seconds = parseInt(this.dataset.time);
    timer.start(seconds);
    console.log(this.dataset.time);
};


buttons.forEach(btn => btn.addEventListener('click', startTimer));

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ( !inputText.value || isNaN(parseInt(inputText.value))) {
        // show error
        console.log('suck');
    } else {
        const seconds = parseInt(inputText.value) * 60;
        timer.start(seconds);
    }
});