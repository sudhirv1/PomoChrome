let timer;
let isTimerRunning = false;
let minutes = 25;
let seconds = 0;
let resetMins = minutes;

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
    minutes = resetMins;
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
        iconUrl: "TomatoTimer.png",
        title: "Times Up!",
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

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "updateSelectedNumber" && message.number) {
        // Update the selectedNumber variable when the popup sends a new value
        minutes = message.number;
        resetMins = minutes;
        updateTimerDisplay();
        // Respond to the popup to acknowledge the update
        sendResponse({ success: true });
    } else if (message.action === "getSelectedNumber") {
        // Send the current selected number to the popup when requested
        sendResponse({ number: minutes });
    }
});
