// app.js - Main application entry point

window.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    console.log('DOM Content Loaded. Checking authentication status...');

    const mainContentWrapper = document.getElementById("main-content-wrapper");
    const authScreen = document.getElementById("auth-screen");

    const storedAuthEmail = sessionStorage.getItem('current_auth_email');
    if (storedAuthEmail) {
        console.log('Found stored email in session. Attempting re-login...');
        const userJson = getSimulatedKVItem(storedAuthEmail);
        if (userJson) {
            const user = JSON.parse(userJson);
            currentUser = { email: user.email, uid: user.uid };
            userProfile = user.profile;
            console.log('Re-login successful with stored email. User:', currentUser.email);
            handleSuccessfulAuth();
        } else {
            console.log('Stored email not found in simulated KV. Showing auth screen.');
            sessionStorage.removeItem('current_auth_email');
            setAuthMode(false);
            authScreen.style.display = "flex";
            mainContentWrapper.style.display = "none";
        }
    } else {
        console.log('No stored email found. Showing auth screen.');
        setAuthMode(false);
        authScreen.style.display = "flex";
        mainContentWrapper.style.display = "none";
    }

    // Initial render of plugins (alphabetical order with non-working at bottom)
    renderPlugins(pluginsData);
    // Initial render for players section (default to richest)
    showPlayerSubSection('top-richest-content');
});