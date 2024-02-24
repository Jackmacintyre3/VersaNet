fetch('https://versanet-2acff-default-rtdb.europe-west1.firebasedatabase.app/speed_test_results.json')
    .then(response => response.json())
    .then(data => {
        const cleanedResults = Object.values(data)
            .filter(result => result.download_speed && result.upload_speed && result.ping_speed);

        cleanedResults.forEach(result => {
            result.timestamp = new Date(result.timestamp);
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
    })
    .catch(error => console.error('Error fetching data:', error));

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
        .style('fill', '#ecf0f1')
        .style('font-size', '14px')
        .text('Mbps');

    chart.append('text')
        .attr('x', width / 2)
        .attr('y', (height + margin.bottom) - 50)
        .attr('dy', '2.5em')
        .style('text-anchor', 'middle')
        .style('fill', '#ecf0f1')
        .text('Time');

    chart.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('fill', '#ecf0f1')
        .style('font-size', '16px')
        .text(title);

    console.log('Chart created successfully.');
}
