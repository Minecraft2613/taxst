// dom-listeners/theme-listeners.js

export function setupThemeListeners() {
    document.getElementById('saveTheme').addEventListener('click', saveTheme);
    document.getElementById('resetTheme').addEventListener('click', resetTheme);
}
