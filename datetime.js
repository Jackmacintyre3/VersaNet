function displayDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        setInterval(function () {
            const now = new Date();
            const formattedDateTime = `${formatDayOfWeek(now)}, ${formatMonthDay(now)} ${formatYear(now)} -- ${formatTime(now)}`;
            datetimeElement.innerHTML = formattedDateTime;
        }, 1000); // Update every 1000 milliseconds (1 second)
    }
}

function formatDayOfWeek(date) {
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatMonthDay(date) {
    const options = { month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatYear(date) {
    const options = { year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatTime(date) {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

displayDateTime();
