
document.addEventListener('DOMContentLoaded', function () {
    fetchArpScanResults();
});

function fetchArpScanResults() {
    fetch('arp_scan_output.txt')
        .then(response => response.text())
        .then(parseArpScanResults)
        .catch(error => console.error('Error fetching ARP scan results:', error));
}

function parseArpScanResults(data) {
    const lines = data.split('\n');
    const hosts = [];
    let interfaceInfo = '';

    let skipLines = 0;

    for (let i = 0; i < lines.length; i++) {
        if (skipLines > 0) {
            skipLines--;
            continue;
        }
        if (lines[i].startsWith('Interface:')) {
            interfaceInfo = lines[i];
            skipLines = 1;
        } else if (!lines[i].startsWith('70') && !lines[i].startsWith('Starting') && !lines[i].startsWith('Ending') && !lines[i].startsWith('153')) {
            const parts = lines[i].trim().split(/\s+/);
            if (parts.length >= 3) {
                const ipAddress = parts[0];
                const macAddress = parts[1];
                const hostname = parts.slice(2).join(' ');
                hosts.push({ ipAddress, macAddress, hostname });
            }
        }
    }

    displayInterface(interfaceInfo);
    displayHosts(hosts);
}

function displayInterface(interfaceInfo) {
    const arpScanResults = document.getElementById('arp-scan-results');
    const interfaceDiv = document.createElement('div');
    interfaceDiv.textContent = interfaceInfo;
    arpScanResults.appendChild(interfaceDiv);
}

function displayHosts(hosts) {
    const hostTableBody = document.getElementById('host-table-body');

    hosts.forEach(host => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${host.ipAddress}</td>
            <td>${host.macAddress}</td>
            <td>${host.hostname}</td>
        `;
        hostTableBody.appendChild(row);
    });
}