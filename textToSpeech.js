
var lastSpokenText = "";
var lastSpokenTime = 0;
var speechQueue = [];

function readText(text) {
    try {
        if (getAudioDescriptionToggle() === "true" && canRead(text)) {
            addToQueue(text);

            // If the queue was empty, start processing it
            if (speechQueue.length === 1) {
                processQueue();
            }
        }
    } catch (error) {
        console.error("Error in readText:", error.message);
    }
}

function canRead(text) {
    // Check if enough time has passed since the last read of the same text
    return text !== lastSpokenText || (Date.now() - lastSpokenTime >= 5000);
}

function addToQueue(text) {
    speechQueue.push(text);
}

function processQueue() {
    if (speechQueue.length > 0) {
        var synth = window.speechSynthesis;
        var textToRead = speechQueue.shift();
        lastSpokenText = textToRead;

        var utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.onend = function () {
            lastSpokenTime = Date.now();
            processQueue(); // Continue with the next item in the queue
        };
        synth.speak(utterance);
    }
}

// Attach event listeners to "Help" and "Settings" links
var helpLink = document.getElementById('helpLink');
var settingsLink = document.getElementById('settingsLink');
var runMonitorButton = document.getElementById('runMonitorButton');

if (helpLink) {
    helpLink.addEventListener('mouseover', function (event) {
        readText("Help");
    });
}

if (settingsLink) {
    settingsLink.addEventListener('mouseover', function (event) {
        readText("Settings");
    });
}

if (runMonitorButton) {
    runMonitorButton.addEventListener('mouseover', function (event) {
        readText("Run Speed Test");
    });
}

// Function to get the value of the Audio Description toggle from the cookie
function getAudioDescriptionToggle() {
    return getCookie("audioDescription");
}

// Function to get the value of a cookie by name
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return "";
}
