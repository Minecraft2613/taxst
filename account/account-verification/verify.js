// account/account-verification/verify.js

CHANGE_PASSWORD_FORM.addEventListener('submit', async (e) => {
    e.preventDefault();
    CHANGE_PASSWORD_MESSAGE.textContent = '';
    const currentPassword = CURRENT_PASSWORD_INPUT.value;
    const newPassword = NEW_PASSWORD_INPUT.value;
    const confirmNewPassword = CONFIRM_NEW_PASSWORD_INPUT.value;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        showCustomMessage(CHANGE_PASSWORD_MESSAGE, 'All password fields are required.', 'error');
        return;
    }
    if (newPassword.length < 6) { // Example strength check
        showCustomMessage(CHANGE_PASSWORD_MESSAGE, 'New password must be at least 6 characters long.', 'error');
        return;
    }
    if (newPassword !== confirmNewPassword) {
        showCustomMessage(CHANGE_PASSWORD_MESSAGE, 'New password and confirmation do not match.', 'error');
        return;
    }

    const response = await simulatedCloudflareApi.changePassword(currentUser.email, currentPassword, newPassword);

    if (response.success) {
        showCustomMessage(CHANGE_PASSWORD_MESSAGE, response.message, 'success');
        // Clear fields on success
        CURRENT_PASSWORD_INPUT.value = '';
        NEW_PASSWORD_INPUT.value = '';
        CONFIRM_NEW_PASSWORD_INPUT.value = '';
    } else {
        showCustomMessage(CHANGE_PASSWORD_MESSAGE, response.message, 'error');
    }
});