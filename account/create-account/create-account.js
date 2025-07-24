// account/create-account/create-account.js

MAIN_AUTH_SUBMIT_BTN.addEventListener('click', async (e) => {
    if (isCreateMode) {
        e.preventDefault();
        MAIN_AUTH_MESSAGE_ELEM.textContent = '';

        const email = MAIN_AUTH_EMAIL_INPUT.value;
        const password = MAIN_AUTH_PASSWORD_INPUT.value;
        const minecraftUsername = AUTH_MINECRAFT_USERNAME_INPUT.value.trim();
        const accountName = AUTH_ACCOUNT_NAME_INPUT.value.trim();
        const minecraftEdition = AUTH_PLATFORM_SELECT.value; // Get selected edition

        if (!email || !password || !minecraftUsername || !accountName || !minecraftEdition) {
            showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'Please fill all required fields for registration (including Minecraft Edition).', 'error');
            return;
        }
        if (!AGREE_RULES_CHECKBOX.checked) {
            showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'You must agree to the Minecraft Server Rules to create an account.', 'error');
            return;
        }

        const response = await simulatedCloudflareApi.register(email, password, minecraftUsername, accountName, minecraftEdition); // Pass edition

        if (response.success) {
            currentUser = { email: response.email, uid: response.uid };
            userProfile = response.user;
            sessionStorage.setItem('current_auth_email', email);
            handleSuccessfulAuth();
            showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'Account created successfully!', 'success');
        } else {
            showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, response.message, 'error');
        }
    }
});
