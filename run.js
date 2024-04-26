async function runMonitor() {
    document.getElementById('loading').style.display = 'block';

    try {
        var fileXhr = new XMLHttpRequest();
        var fileUrl = 'speedtest_results.txt';

        fileXhr.open('GET', fileUrl, true);

        fileXhr.onload = function () {
            if (fileXhr.status === 200) {
                var content = fileXhr.responseText;

                var pingMatch = content.match(/Ping: (\d+\.\d+)/);
                var downloadMatch = content.match(/Download: (\d+\.\d+)/);
                var uploadMatch = content.match(/Upload: (\d+\.\d+)/);

                var pingSpeed = pingMatch ? pingMatch[1] + ' ms' : 'N/A';
                var downloadSpeed = downloadMatch ? downloadMatch[1] + ' Mbps' : 'N/A';
                var uploadSpeed = uploadMatch ? uploadMatch[1] + ' Mbps' : 'N/A';

                setTimeout(function () {
                    var outputString = '<pre>Speed Test Results: Ping: ' + pingSpeed + ' | Download Speed: ' + downloadSpeed + ' | Upload Speed: ' + uploadSpeed + '</pre>';
                    document.getElementById('network-stats').innerHTML = outputString;

                    document.getElementById('loading').style.display = 'none';
                }, 10000);
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
