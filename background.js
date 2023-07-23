let timer;
let isTimerRunning = false;
let minutes = 25;
let seconds = 0;

function startTimer() {
    console.log("start timer func");
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    console.log("pause timer func");
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    console.log("reset timer func");
    clearInterval(timer);
    isTimerRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    console.log("update timer func");
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

    chrome.runtime.sendMessage({
        action: "updateTimerDisplay",
        timerData: { minutes, seconds },
    });
}

function updateTimerDisplay() {
    console.log("updateTimerDisplay in background");
    chrome.runtime.sendMessage({
        action: "updateTimerDisplay",
        timerData: { minutes, seconds },
    });
}

// Listen for messages from the popup (popup.html)
chrome.runtime.onMessage.addListener((message) => {
    if (message === "start") {
        console.log('Start PRESSED');
    startTimer();
    } else if (message === "pause") {
        console.log("Pause PRESSED");
    pauseTimer();
    } else if (message === "reset") {
        console.log("Reset PRESSED");
    resetTimer();
    }
});
