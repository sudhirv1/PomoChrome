let timer;
let isTimerRunning = false;
let minutes = 25;
let seconds = 0;

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        // Timer has reached zero, show notification
        chrome.notifications.create({
        type: "basic",
        iconUrl: "TomatoTimer_128.png",
        title: "PomoChrome",
        message: "Pomodoro session complete!",
        });
        resetTimer();
    }

    updateTimerDisplay();
}

function updateTimerDisplay() {
  // Code to update the timer display in the popup (popup.html)
  // You can use DOM manipulation here.
}

// Listen for messages from the popup (popup.html)
chrome.runtime.onMessage.addListener((message) => {
    if (message === "start") {
    startTimer();
    } else if (message === "pause") {
    pauseTimer();
    } else if (message === "reset") {
    resetTimer();
    }
});
