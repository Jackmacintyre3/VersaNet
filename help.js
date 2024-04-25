function toggleTheme() {
    const themeLink = document.getElementById('theme');
    const newTheme = themeLink.href.includes('dark-theme.css') ? 'light-theme.css' : 'dark-theme.css';
    themeLink.href = newTheme;
    setCookie('theme', newTheme, 365);
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

setThemeFromCookie();
setHelpTextVisibility();

function setThemeFromCookie() {
    const theme = getCookie('theme');
    if (theme) {
        document.getElementById('theme').href = theme;
    }
}

function setHelpTextVisibility() {
    const helpEnabled = getCookie('helpEnabled');
    const toolDescriptions = document.querySelectorAll('.tool-description');
    if (helpEnabled === 'true') {
        toolDescriptions.forEach(description => {
            description.style.display = 'none';
            description.parentElement.addEventListener('mouseenter', () => {
                description.style.display = 'block';
            });
            description.parentElement.addEventListener('mouseleave', () => {
                description.style.display = 'none';
            });
        });
    } else {
        toolDescriptions.forEach(description => {
            description.style.display = 'none';
        });
    }
}
