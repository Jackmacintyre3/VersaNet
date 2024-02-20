
function displayDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        const now = new Date();
        const formattedDateTime = `${formatDate(now)} -- ${formatTime(now)}`;
        datetimeElement.innerHTML = formattedDateTime;
    }
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return `${formattedDate.replace(/\d+/, day + suffix)}`;
}

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }

    const lastDigit = day % 10;
    switch (lastDigit) {
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

function formatTime(date) {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

displayDateTime();
