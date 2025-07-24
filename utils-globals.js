// utils-globals.js - Combined utility functions and global variables

// --- Global State Variables ---
let currentUser = null;
let userProfile = null;
let isCreateMode = false;

// --- Common Utility Functions ---

// --- Custom Message Box (Replaces alert()) ---
window.showCustomAlert = function(title, message, duration = 3000) {
    const messageBoxOverlay = document.getElementById('message-box-overlay');
    const messageBoxTitle = document.getElementById('message-box-title');
    const messageBoxContent = document.getElementById('message-box-content');

    messageBoxTitle.textContent = title;
    messageBoxContent.textContent = message;
    messageBoxOverlay.classList.add('active');

    setTimeout(() => {
        messageBoxOverlay.classList.remove('active');
    }, duration);
};

const originalAlert = window.alert;
window.alert = function(message) {
    window.showCustomAlert('Alert', message);
};

// --- Simulated User Data Management (using localStorage) ---
// Initial user data (from account.json concept)
let users = {
    'an@an': {
        email: 'an@an',
        password: '26',
        uid: 'user_YW5AYW4=',
        profile: {
            minecraftUsername: 'AN',
            minecraftEdition: 'java',
            accountId: 'user_YW5AYW4=',
            accountName: 'AN',
            avatar: ''
        }
    }
};

// Load users from localStorage if available
const storedUsers = localStorage.getItem('all_users');
if (storedUsers) {
    try {
        users = JSON.parse(storedUsers);
    } catch (e) {
        console.error("Error parsing stored users from localStorage:", e);
        localStorage.removeItem('all_users');
    }
}

function saveUsersToLocalStorage() {
    localStorage.setItem('all_users', JSON.stringify(users));
}

window.simulatedCloudflareApi = {
    async login(email, password) {
        return new Promise(resolve => {
            setTimeout(() => {
                const user = users[email.toLowerCase()];
                if (user && user.password === password) {
                    console.log('Simulated API Login Success for:', email);
                    resolve({ success: true, user: user.profile, email: user.email, uid: user.uid });
                } else {
                    console.log('Simulated API Login Failed for:', email);
                    resolve({ success: false, message: 'Invalid username/email or password.' });
                }
            }, 500);
        });
    },
    async register(email, password, minecraftUsername, accountName, minecraftEdition) {
        return new Promise(resolve => {
            setTimeout(() => {
                const lowerCaseEmail = email.toLowerCase();
                if (users[lowerCaseEmail]) {
                    console.log('Simulated API Register Failed: User exists', email);
                    resolve({ success: false, message: 'Account with this email already exists.' });
                    return;
                }
                const uid = window.generateUID(lowerCaseEmail);
                const newUser = {
                    email: lowerCaseEmail,
                    password: password,
                    uid: uid,
                    profile: {
                        minecraftUsername: minecraftUsername,
                        minecraftEdition: minecraftEdition,
                        accountId: uid,
                        accountName: accountName,
                        avatar: ''
                    }
                };
                users[lowerCaseEmail] = newUser;
                saveUsersToLocalStorage();
                console.log('Simulated API Register Success for:', email);
                resolve({ success: true, user: newUser.profile, email: newUser.email, uid: newUser.uid });
            }, 500);
        });
    },
    async updateProfile(email, newProfileData) {
        return new Promise(resolve => {
            setTimeout(() => {
                const user = users[email.toLowerCase()];
                if (!user) {
                    console.log('Simulated API Update Profile Failed: User not found', email);
                    resolve({ success: false, message: 'User not found.' });
                    return;
                }
                user.profile = { ...user.profile, ...newProfileData };
                saveUsersToLocalStorage();
                console.log('Simulated API Update Profile Success for:', email);
                resolve({ success: true, user: user.profile });
            }, 500);
        });
    },
    async changePassword(email, currentPassword, newPassword) {
        return new Promise(resolve => {
            setTimeout(() => {
                const user = users[email.toLowerCase()];
                if (!user) {
                    resolve({ success: false, message: 'User not found.' });
                    return;
                }
                if (user.password !== currentPassword) {
                    resolve({ success: false, message: 'Incorrect current password.' });
                    return;
                }
                user.password = newPassword;
                saveUsersToLocalStorage();
                resolve({ success: true, message: 'Password updated successfully!' });
            }, 500);
        });
    }
};

window.generateUID = function(email) {
    return 'user_' + btoa(email).replace(/=/g, '').substring(0, 10) + '_' + Date.now().toString().slice(-4);
};

window.showCustomMessage = function(element, message, type) {
    let msgElement = null;
    const closestForm = element.closest('form');
    if (closestForm) {
        msgElement = closestForm.querySelector('.custom-message');
        if (!msgElement) {
            msgElement = document.createElement('p');
            msgElement.classList.add('custom-message');
            closestForm.appendChild(msgElement);
        }
    } else {
        if (element.tagName === 'H2' || element.tagName === 'P') {
            msgElement = element;
        } else {
            msgElement = document.querySelector('#dynamic-content-area') || document.body;
            const existingTempMsg = msgElement.querySelector('.custom-message.temp');
            if(existingTempMsg) existingTempMsg.remove();
            const newTempMsg = document.createElement('p');
            newTempMsg.classList.add('custom-message', 'temp');
            msgElement.appendChild(newTempMsg);
            msgElement = newTempMsg;
        }
    }

    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = `custom-message ${type}`;
        setTimeout(() => {
            msgElement.textContent = '';
            msgElement.classList.remove('error', 'success');
            if (msgElement.classList.contains('temp')) {
                msgElement.remove();
            }
        }, 3000);
    }
};

// --- Auth Mode Toggle (Login / Create Account) ---
window.setAuthMode = function(mode) {
    isCreateMode = mode;
    const MAIN_AUTH_MESSAGE_ELEM = document.getElementById('auth-message-main');
    const AUTH_MINECRAFT_USERNAME_INPUT = document.getElementById('auth-minecraft-username-input');
    const AUTH_ACCOUNT_NAME_INPUT = document.getElementById('auth-account-name-input');
    const AUTH_PLATFORM_SELECT = document.getElementById('auth-platform-select');
    const RULES_CHECKBOX_CONTAINER = document.getElementById('rules-checkbox-container');
    const MAIN_AUTH_SUBMIT_BTN = document.getElementById('main-auth-submit-btn');
    const TOGGLE_AUTH_MODE_BTN = document.getElementById('toggle-auth-mode-btn');
    const AUTH_WELCOME_MESSAGE = document.getElementById('auth-welcome-message');
    const MAIN_AUTH_EMAIL_INPUT = document.getElementById('auth-email-input');
    const MAIN_AUTH_PASSWORD_INPUT = document.getElementById('auth-password-input');
    const AGREE_RULES_CHECKBOX = document.getElementById('agree-rules-checkbox');

    MAIN_AUTH_MESSAGE_ELEM.textContent = '';

    AUTH_MINECRAFT_USERNAME_INPUT.style.display = 'none';
    AUTH_ACCOUNT_NAME_INPUT.style.display = 'none';
    AUTH_PLATFORM_SELECT.style.display = 'none';
    document.querySelector('label[for="auth-platform-select"]').style.display = 'none';
    RULES_CHECKBOX_CONTAINER.style.display = 'none';
    AUTH_MINECRAFT_USERNAME_INPUT.removeEventListener('input', window.forceDotPrefix);

    if (isCreateMode) {
        AUTH_WELCOME_MESSAGE.textContent = 'Thanks for Joining!';
        AUTH_MINECRAFT_USERNAME_INPUT.style.display = 'block';
        AUTH_ACCOUNT_NAME_INPUT.style.display = 'block';
        AUTH_PLATFORM_SELECT.style.display = 'block';
        document.querySelector('label[for="auth-platform-select"]').style.display = 'block';
        RULES_CHECKBOX_CONTAINER.style.display = 'flex';
        MAIN_AUTH_SUBMIT_BTN.textContent = 'Register Account';
        TOGGLE_AUTH_MODE_BTN.textContent = 'Have an account? Login';
    } else {
        AUTH_WELCOME_MESSAGE.textContent = 'Welcome Back!';
        MAIN_AUTH_SUBMIT_BTN.textContent = 'Login';
        TOGGLE_AUTH_MODE_BTN.textContent = 'Don\'t have an account? Create one';
    }
    MAIN_AUTH_EMAIL_INPUT.value = '';
    MAIN_AUTH_PASSWORD_INPUT.value = '';
    AUTH_MINECRAFT_USERNAME_INPUT.value = '';
    AUTH_ACCOUNT_NAME_INPUT.value = '';
    AUTH_PLATFORM_SELECT.value = '';
    AGREE_RULES_CHECKBOX.checked = false;
};

window.forceDotPrefix = function() {
    const AUTH_PLATFORM_SELECT = document.getElementById('auth-platform-select');
    const AUTH_MINECRAFT_USERNAME_INPUT = document.getElementById('auth-minecraft-username-input');
    if (AUTH_PLATFORM_SELECT.value === 'bedrock' && !AUTH_MINECRAFT_USERNAME_INPUT.value.startsWith('.')) {
        AUTH_MINECRAFT_USERNAME_INPUT.value = '.' + AUTH_MINECRAFT_USERNAME_INPUT.value.replace(/^\.+/, '');
    }
};

window.handleSuccessfulAuth = function() {
    const AUTH_SCREEN = document.getElementById('auth-screen');
    const MAIN_CONTENT_WRAPPER = document.getElementById('main-content-wrapper');

    AUTH_SCREEN.style.display = 'none';
    MAIN_CONTENT_WRAPPER.style.display = 'block';
    console.log('Auth successful: showing main content.');
    window.renderProfile();
    window.renderPlugins(pluginsData);
    window.showPlayerSubSection('top-richest-content');
    window.fetchServerStatus();
};

window.renderProfile = function() {
    const DISPLAY_EMAIL = document.getElementById('display-email');
    const DISPLAY_MINECRAFT_USERNAME = document.getElementById('display-minecraft-username');
    const DISPLAY_MINECRAFT_EDITION = document.getElementById('display-minecraft-edition');
    const DISPLAY_ACCOUNT_ID = document.getElementById('display-account-id');
    const DISPLAY_ACCOUNT_NAME = document.getElementById('display-account-name');
    const MINECRAFT_USERNAME_INPUT = document.getElementById('minecraft-username');
    const ACCOUNT_NAME_INPUT = document.getElementById('account-name');

    if (currentUser && userProfile) {
        DISPLAY_EMAIL.textContent = currentUser.email;
        DISPLAY_MINECRAFT_USERNAME.textContent = userProfile.minecraftUsername || 'N/A';
        DISPLAY_MINECRAFT_EDITION.textContent = (userProfile.minecraftEdition === 'java' ? 'Java Edition' : (userProfile.minecraftEdition === 'bedrock' ? 'Bedrock Edition' : 'N/A'));
        DISPLAY_ACCOUNT_ID.textContent = currentUser.uid || 'N/A';
        DISPLAY_ACCOUNT_NAME.textContent = userProfile.accountName || 'N/A';

        MINECRAFT_USERNAME_INPUT.value = userProfile.minecraftUsername || '';
        ACCOUNT_NAME_INPUT.value = userProfile.accountName || '';

        window.updateAvatarDisplay(userProfile.avatar, currentUser.email);
    }
};

window.updateAvatarDisplay = function(avatarDataUrl, email) {
    const mainProfileImage = document.getElementById('profile-image');
    const mainProfileInitial = document.getElementById('profile-initial');
    const HEADER_PROFILE_IMAGE = document.getElementById('header-profile-image');
    const HEADER_PROFILE_INITIAL = document.getElementById('header-profile-initial');

    if (avatarDataUrl) {
        mainProfileImage.src = avatarDataUrl;
        mainProfileImage.style.display = 'block';
        mainProfileInitial.style.display = 'none';
    } else {
        mainProfileImage.style.display = 'none';
        mainProfileInitial.style.display = 'flex';
        mainProfileInitial.textContent = email ? email.charAt(0).toUpperCase() : '?';
    }

    if (HEADER_PROFILE_IMAGE && HEADER_PROFILE_INITIAL) {
        if (avatarDataUrl) {
            HEADER_PROFILE_IMAGE.src = avatarDataUrl;
            HEADER_PROFILE_IMAGE.style.display = 'block';
            HEADER_PROFILE_INITIAL.style.display = 'none';
        } else {
            HEADER_PROFILE_IMAGE.style.display = 'none';
            HEADER_PROFILE_INITIAL.style.display = 'flex';
            HEADER_PROFILE_INITIAL.textContent = email ? email.charAt(0).toUpperCase() : '?';
        }
    }
};

// --- UI Navigation & Sidebar Logic ---
window.toggleSidebar = function() {
    const SIDEBAR = document.getElementById('sidebar');
    const MAIN_CONTENT_WRAPPER = document.getElementById('main-content-wrapper');
    const OVERLAY = document.querySelector('.overlay');

    SIDEBAR.classList.toggle('open');
    MAIN_CONTENT_WRAPPER.classList.toggle('sidebar-open');
    OVERLAY.classList.toggle('active');
};

window.showSection = function(sectionId) {
    const HOMEPAGE_NAV_SECTION = document.getElementById('homepage-nav-section');
    const ALL_CONTENT_SECTIONS = document.querySelectorAll('#dynamic-content-area > .content-section');
    const SIDEBAR_NAV_LINKS = document.querySelectorAll('#sidebar nav a');

    ALL_CONTENT_SECTIONS.forEach(section => {
        section.classList.remove('active');
    });

    if (['server-info-content', 'plugins-content', 'how-to-play-content'].includes(sectionId)) {
        HOMEPAGE_NAV_SECTION.style.display = 'flex';
        document.getElementById(sectionId).classList.add('active');
    } else {
        HOMEPAGE_NAV_SECTION.style.display = 'none';
        document.getElementById(sectionId).classList.add('active');
    }

    SIDEBAR_NAV_LINKS.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
        if (link.dataset.section === "server-info-content" && ['server-info-content', 'plugins-content', 'how-to-play-content'].includes(sectionId)) {
            link.classList.add('active');
        }
    });
};