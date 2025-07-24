// dom-listeners/theme-listeners.js

export function setupThemeListeners() {
    const saveThemeButton = document.getElementById('saveTheme');
    const resetThemeButton = document.getElementById('resetTheme');

    if (saveThemeButton) {
        saveThemeButton.addEventListener('click', saveTheme);
    }
    if (resetThemeButton) {
        resetThemeButton.addEventListener('click', resetTheme);
    }
}