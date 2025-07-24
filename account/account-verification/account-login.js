// account/account-verification/account-login.js

// This file now only contains the login logic.

MAIN_AUTH_SUBMIT_BTN.addEventListener('click', async (e) => {
    if (!isCreateMode) {
        e.preventDefault();
        MAIN_AUTH_MESSAGE_ELEM.textContent = '';

        const email = MAIN_AUTH_EMAIL_INPUT.value;
        const password = MAIN_AUTH_PASSWORD_INPUT.value;

        const response = await simulatedCloudflareApi.login(email, password);

        if (response.success) {
            currentUser = { email: response.email, uid: response.uid };
            userProfile = response.user;
            sessionStorage.setItem('current_auth_email', email);
            handleSuccessfulAuth();
            showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'Login successful!', 'success');
        } else {
            showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, response.message, 'error');
        }
    }
});
