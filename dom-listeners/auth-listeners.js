// dom-listeners/auth-listeners.js

export function setupAuthListeners() {
    const MAIN_AUTH_SUBMIT_BTN = document.getElementById('main-auth-submit-btn');
    const TOGGLE_AUTH_MODE_BTN = document.getElementById('toggle-auth-mode-btn');
    const AUTH_PLATFORM_SELECT = document.getElementById('auth-platform-select');
    const AUTH_MINECRAFT_USERNAME_INPUT = document.getElementById('auth-minecraft-username-input');
    const MAIN_AUTH_MESSAGE_ELEM = document.getElementById('auth-message-main');
    const MAIN_AUTH_EMAIL_INPUT = document.getElementById('auth-email-input');
    const MAIN_AUTH_PASSWORD_INPUT = document.getElementById('auth-password-input');
    const AUTH_ACCOUNT_NAME_INPUT = document.getElementById('auth-account-name-input');
    const AGREE_RULES_CHECKBOX = document.getElementById('agree-rules-checkbox');

    TOGGLE_AUTH_MODE_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        setAuthMode(!isCreateMode);
    });

    MAIN_AUTH_SUBMIT_BTN.addEventListener('click', async (e) => {
        e.preventDefault();
        MAIN_AUTH_MESSAGE_ELEM.textContent = '';

        const email = MAIN_AUTH_EMAIL_INPUT.value;
        const password = MAIN_AUTH_PASSWORD_INPUT.value;

        if (isCreateMode) {
            const minecraftUsername = AUTH_MINECRAFT_USERNAME_INPUT.value.trim();
            const accountName = AUTH_ACCOUNT_NAME_INPUT.value.trim();
            const minecraftEdition = AUTH_PLATFORM_SELECT.value;

            if (!email || !password || !minecraftUsername || !accountName || !minecraftEdition) {
                showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'Please fill all required fields for registration (including Minecraft Edition).', 'error');
                return;
            }
            if (!AGREE_RULES_CHECKBOX.checked) {
                showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'You must agree to the Minecraft Server Rules to create an account.', 'error');
                return;
            }

            const response = await simulatedCloudflareApi.register(email, password, minecraftUsername, accountName, minecraftEdition);

            if (response.success) {
                currentUser = { email: response.email, uid: response.uid };
                userProfile = response.user;
                sessionStorage.setItem('current_auth_email', email);
                handleSuccessfulAuth();
                showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, 'Account created successfully!', 'success');
            } else {
                showCustomMessage(MAIN_AUTH_MESSAGE_ELEM, response.message, 'error');
            }

        } else {
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

    AUTH_PLATFORM_SELECT.addEventListener('change', () => {
        if (AUTH_PLATFORM_SELECT.value === 'bedrock') {
            AUTH_MINECRAFT_USERNAME_INPUT.value = '.';
            AUTH_MINECRAFT_USERNAME_INPUT.addEventListener('input', forceDotPrefix);
        } else {
            AUTH_MINECRAFT_USERNAME_INPUT.removeEventListener('input', forceDotPrefix);
            AUTH_MINECRAFT_USERNAME_INPUT.value = '';
        }
    });
}