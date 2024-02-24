

// Function to toggle the theme and update the cookie
function toggleTheme() {
    const themeLink = document.getElementById('theme');
    const newTheme = themeLink.href.includes('dark-theme.css') ? 'light-theme.css' : 'dark-theme.css';
    themeLink.href = newTheme;
    setCookie('theme', newTheme, 365);  // Set the cookie with a 1-year expiration
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get the value of a cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Set the theme on page load
setThemeFromCookie();

// Function to set the theme based on the cookie
function setThemeFromCookie() {
    const theme = getCookie('theme');
    if (theme) {
        document.getElementById('theme').href = theme;
    }
}
