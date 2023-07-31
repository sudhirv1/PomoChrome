document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.getElementById("number-input");
    const increaseButton = document.getElementById("increase-button");
    const decreaseButton = document.getElementById("decrease-button");
    const selectedNumberSpan = document.getElementById("selected-number");

    function updateSelectedNumber(number) {
        selectedNumberSpan.textContent = number;
    }
    function sendSelectedNumberToBackground(number) {
        chrome.runtime.sendMessage({ action: "updateSelectedNumber", number });
    }
    numberInput.addEventListener("input", function () {
        const selectedNumber = parseInt(numberInput.value);
        updateSelectedNumber(selectedNumber);
        sendSelectedNumberToBackground(selectedNumber);
    });

    // Add event listeners for the spinner buttons
    increaseButton.addEventListener("click", function () {
        numberInput.stepUp();
        const selectedNumber = parseInt(numberInput.value);
        updateSelectedNumber(selectedNumber);
        sendSelectedNumberToBackground(selectedNumber);
    });

    decreaseButton.addEventListener("click", function () {
        numberInput.stepDown();
        const selectedNumber = parseInt(numberInput.value);
        updateSelectedNumber(selectedNumber);
        sendSelectedNumberToBackground(selectedNumber);
    });
    chrome.runtime.sendMessage(
        { action: "getSelectedNumber" },
        function (response) {
            if (response && response.number) {
            numberInput.value = response.number;
            updateSelectedNumber(response.number);
            }
        }
    );
    /////////////////////
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

