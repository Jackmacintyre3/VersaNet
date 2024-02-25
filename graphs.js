
let selectedDate = new Date().toISOString().split('T')[0];

function filterDataForSelectedDate(data, selectedDate) {
    return Object.values(data)
        .filter(result => result.download_speed && result.upload_speed && result.ping_speed)
        .filter(result => result.timestamp.startsWith(selectedDate));
}

function loadData() {
    fetch('https://versanet-2acff-default-rtdb.europe-west1.firebasedatabase.app/speed_test_results.json')
        .then(response => response.json())
        .then(data => {
            const cleanedResults = filterDataForSelectedDate(data, selectedDate);

            cleanedResults.forEach(result => {
                result.timestamp = new Date(result.timestamp);
                result.download_speed = parseFloat(result.download_speed);
                result.upload_speed = parseFloat(result.upload_speed);
                result.ping_speed = parseFloat(result.ping_speed);
            });

            const startTime = new Date(Math.min(...cleanedResults.map(result => result.timestamp.getTime())));

            const groupedResults = d3.rollups(
                cleanedResults,
                group => ({
                    download_speed: d3.mean(group, d => parseFloat(d.download_speed)),
                    upload_speed: d3.mean(group, d => parseFloat(d.upload_speed)),
                    ping_speed: d3.mean(group, d => parseFloat(d.ping_speed))
                }),
                d => new Date(startTime.getTime() + Math.floor((d.timestamp - startTime) / (15 * 60 * 1000)) * (15 * 60 * 1000))
            );

            const sortedResults = groupedResults
                .sort((a, b) => a[0] - b[0])
                .map(result => ({ timestamp: new Date(result[0]), ...result[1] }));

            const tableBody = document.querySelector('#speedTestTable tbody');
            tableBody.innerHTML = '';

            if (sortedResults.length === 0) {
                const noDataRow = tableBody.insertRow();
                const noDataCell = noDataRow.insertCell(0);
                noDataCell.colSpan = 4;
                noDataCell.textContent = 'No Data for selected day';

                // Update the heading even when there's no data
                const heading = document.querySelector('h2');
                heading.textContent = `Speed Test Results - ${formatDate(selectedDate)}`;

                // Clear the graphs
                clearGraphs();

                return;
            }

            sortedResults.forEach(result => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = result.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                row.insertCell(1).textContent = result.download_speed.toFixed(2);
                row.insertCell(2).textContent = result.upload_speed.toFixed(2);
                row.insertCell(3).textContent = result.ping_speed.toFixed(2);
            });

            const averageTimestamps = sortedResults.map(result => result.timestamp);
            const downloadSpeeds = sortedResults.map(result => result.download_speed);
            const uploadSpeeds = sortedResults.map(result => result.upload_speed);
            const pingSpeeds = sortedResults.map(result => result.ping_speed);

            createLineChart('Download Speed Over Time', 'downloadChart', averageTimestamps, downloadSpeeds);
            createLineChart('Upload Speed Over Time', 'uploadChart', averageTimestamps, uploadSpeeds, [9, 10]);
            createLineChart('Ping Speed Over Time', 'pingChart', averageTimestamps, pingSpeeds);

            // Update the heading with the selected date
            const heading = document.querySelector('h2');
            heading.textContent = `Speed Test Results - ${formatDate(selectedDate)}`;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to format the date as "25th of February 2024"
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);

    const day = date.getDate();
    const daySuffix = getDaySuffix(day);

    return formattedDate.replace(/\d+/, day + daySuffix);
}

// Function to get the day suffix (st, nd, rd, or th)
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }

    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

// Load data for the current day by default
loadData();

function loadPreviousDayData() {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    selectedDate = currentDate.toISOString().split('T')[0];
    loadData();
}

function loadNextDayData() {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    selectedDate = currentDate.toISOString().split('T')[0];
    loadData();
}

const loadPreviousDayButton = document.getElementById('loadPreviousDayButton');
loadPreviousDayButton.addEventListener('click', loadPreviousDayData);

const loadNextDayButton = document.getElementById('loadNextDayButton');
loadNextDayButton.addEventListener('click', loadNextDayData);

const loadDataButton = document.getElementById('loadDataButton');
loadDataButton.addEventListener('click', loadData);

// Rest of your code...

function createLineChart(title, svgId, xData, yData, yDomain) {
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = window.innerWidth * 0.9 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(`#${svgId}`);
    if (!svg.empty()) {
        svg.html('');
    } else {
        console.error(`SVG element with ID ${svgId} not found.`);
        return;
    }

    const chart = svg
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top + 10})`);

    const xScale = d3.scaleTime()
        .domain(d3.extent(xData))
        .range([0, width]);

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat('%H:%M'));

    const yScale = d3.scaleLinear()
        .domain(yDomain || [d3.min(yData) - 1, d3.max(yData) + 1])
        .range([height, 0]);

    chart.append('path')
        .datum(d3.zip(xData, yData))
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]))
        );

    chart.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    chart.append('g')
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -height / 2)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text('Mbps');

    chart.append('text')
        .attr('x', width / 2)
        .attr('y', (height + margin.bottom) - 50)
        .attr('dy', '2.5em')
        .style('text-anchor', 'middle')
        .text('Time');

    chart.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(title);

    console.log('Chart created successfully.');
}

function clearGraphs() {
    const chartIds = ['downloadChart', 'uploadChart', 'pingChart'];
    chartIds.forEach(chartId => {
        const svg = d3.select(`#${chartId}`);
        if (!svg.empty()) {
            svg.html('');
        } else {
            console.error(`SVG element with ID ${chartId} not found.`);
        }
    });

    console.log('Graphs cleared successfully.');
}
