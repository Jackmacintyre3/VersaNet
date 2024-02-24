document.addEventListener("DOMContentLoaded", function () {
    // Initialize the internet status indicator
    initializeStatusIndicator();

    // Run the checkInternet function every 5 seconds (adjust as needed)
    setInterval(checkInternet, 5000);
});

async function checkInternet() {
    try {
        const response = await fetch('ping_result.txt');

        // Assuming that the content of ping_result.txt includes the percentage packet loss
        const resultText = await response.text();

        // Check if the content contains '0% packet loss'
        const isUp = resultText.toLowerCase().includes('0% packet loss');

        updateStatusIndicator(isUp);
    } catch (error) {
        updateStatusIndicator(false); // Internet is down
    }
}

function initializeStatusIndicator() {
    const statusIndicator = document.getElementById('internet-status');
    statusIndicator.innerHTML = 'Internet Connection: <div class="status-circle"></div>';
}

function updateStatusIndicator(isUp) {
    const statusIndicator = document.querySelector('.status-circle');
    const statusText = document.getElementById('internet-status');

    if (isUp) {
        statusIndicator.style.backgroundColor = '#2ecc71'; // Green color
        statusText.innerHTML = 'Internet Connection: <div class="status-circle" style="background-color: #2ecc71;"></div> Online';
    } else {
        statusIndicator.style.backgroundColor = '#e74c3c'; // Red color
        statusText.innerHTML = 'Internet Connection: <div class="status-circle" style="background-color: #e74c3c;"></div> Offline';
    }
}
