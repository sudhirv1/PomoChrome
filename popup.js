document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-button").addEventListener("click", () => {
        chrome.runtime.sendMessage("start");
    });

    document.getElementById("pause-button").addEventListener("click", () => {
        chrome.runtime.sendMessage("pause");
    });

    document.getElementById("reset-button").addEventListener("click", () => {
        chrome.runtime.sendMessage("reset");
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "updateTimerDisplay") {
            const { minutes, seconds } = message.timerData;
            updateTimerDisplay(minutes, seconds);
        }
    });
});

function updateTimerDisplay(minutes, seconds) {
    const timerDisplayElement = document.getElementById("timer-display");
    timerDisplayElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

