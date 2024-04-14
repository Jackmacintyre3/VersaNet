
var lastSpokenText = "";
var lastSpokenTime = 0;
var speechQueue = [];

function readText(text) {
    try {
        if (getAudioDescriptionToggle() === "true" && canRead(text)) {
            addToQueue(text);

            if (speechQueue.length === 1) {
                processQueue();
            }
        }
    } catch (error) {
        console.error("Error in readText:", error.message);
    }
}

function canRead(text) {
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
            processQueue();
        };
        synth.speak(utterance);
    }
}

var helpLink = document.getElementById('helpLink');
var settingsLink = document.getElementById('settingsLink');
var resultsLink = document.getElementById('resultsLink');
var runMonitorButton = document.getElementById('runMonitorButton');
var scanLink = document.getElementById('scanLink');

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


if (scanLink) {
    scanLink.addEventListener('mouseover', function (event) {
        readText("Network Scan Results");
    });
}


if (runMonitorButton) {
    runMonitorButton.addEventListener('mouseover', function (event) {
        readText("Run Speed Test");
    });
}


if (resultsLink) {
    resultsLink.addEventListener('mouseover', function (event) {
        readText("Results");
    });
}

function getAudioDescriptionToggle() {
    return getCookie("audioDescription");
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
    return "";
}
