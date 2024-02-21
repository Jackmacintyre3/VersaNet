
function runMonitor() {
    // Show loading icon
    document.getElementById('loading').style.display = 'block';

    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the script URL on the server that will execute the monitor_network.sh script
    var scriptUrl = 'run_monitor.sh'; // Adjust the path if needed

    // Set up the request
    xhr.open('GET', scriptUrl, true);

    // Define the function to handle the response
    xhr.onload = function () {
        // Hide loading icon
        document.getElementById('loading').style.display = 'none';

        if (xhr.status === 200) {
            // After the script is executed, wait for a brief moment and then read and display the content of the text file
            setTimeout(function () {
                readTextFile('speedtest_results.txt');
            }, 25000); // Adjust the delay (in milliseconds) as needed
        } else {
            // Handle errors if needed
            console.error('Error:', xhr.statusText);
        }
    };

    // Send the request
    xhr.send();
}

function readTextFile(file) {
    // Create a new XMLHttpRequest object
    var fileXhr = new XMLHttpRequest();

    // Set up the request to read the content of the text file
    fileXhr.open('GET', file, true);

    // Define the function to handle the response
    fileXhr.onload = function () {
        if (fileXhr.status === 200) {
            // Parse and format the content
            var content = fileXhr.responseText;
            var lines = content.split('\n');

            var downloadSpeed, uploadSpeed;

            lines.forEach(function (line) {
                if (line.startsWith('Download:')) {
                    downloadSpeed = line.replace('Download:', '').trim();
                } else if (line.startsWith('Upload:')) {
                    uploadSpeed = line.replace('Upload:', '').trim();
                }
            });

            // Display the formatted content in the 'output' div
            document.getElementById('output').innerHTML = '<pre>Download Speed: ' + downloadSpeed + ' Mbps\nUpload Speed: ' + uploadSpeed + ' Mbps</pre>';
        } else {
            // Handle errors if needed
            console.error('Error:', fileXhr.statusText);
        }
    };

    // Send the request to read the text file
    fileXhr.send();
}