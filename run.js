
async function runMonitor() {
    document.getElementById('loading').style.display = 'block';

    try {
        var fileXhr = new XMLHttpRequest();
        var fileUrl = 'speedtest_results.txt';

        fileXhr.open('GET', fileUrl, true);

        fileXhr.onload = function () {
            if (fileXhr.status === 200) {
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

                setTimeout(function () {
                    // Display the formatted content in the 'network-stats' div
                    var outputString = '<pre>Basic Router Stats: Download Speed: ' + downloadSpeed + ' Mbps | Upload Speed: ' + uploadSpeed + ' Mbps</pre>';
                    document.getElementById('network-stats').innerHTML = outputString;

                    document.getElementById('loading').style.display = 'none';
                }, 10000); // 10-second delay
            } else {
                console.error('Error:', fileXhr.statusText);
                document.getElementById('loading').style.display = 'none';
            }
        };

        fileXhr.send();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
    }
}
async function runMonitor() {
    document.getElementById('loading').style.display = 'block';

    try {
        var fileXhr = new XMLHttpRequest();
        var fileUrl = 'speedtest_results.txt';

        fileXhr.open('GET', fileUrl, true);

        fileXhr.onload = function () {
            if (fileXhr.status === 200) {
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

                setTimeout(function () {
                    // Display the formatted content in the 'network-stats' div
                    var outputString = '<pre>Basic Router Stats: Download Speed: ' + downloadSpeed + ' Mbps | Upload Speed: ' + uploadSpeed + ' Mbps</pre>';
                    document.getElementById('network-stats').innerHTML = outputString;

                    document.getElementById('loading').style.display = 'none';
                }, 10000); // 10-second delay
            } else {
                console.error('Error:', fileXhr.statusText);
                document.getElementById('loading').style.display = 'none';
            }
        };

        fileXhr.send();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
    }
}
