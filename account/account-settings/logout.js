// account/account-settings/logout.js

function logoutUser() {
    currentUser = null;
    userProfile = null;
    sessionStorage.removeItem('current_auth_email'); // Clear auth session
    console.log('User logged out. Clearing session.');

    AUTH_SCREEN.style.display = 'flex'; // Show auth screen
    document.getElementById('main-content-wrapper').style.display = 'none'; // Hide main content
    showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'You have been logged out.', 'success');
    // Reset auth form fields and set to login mode
    setAuthMode(false); // Reset to login mode
    toggleSidebar(); // Close sidebar if open
}
