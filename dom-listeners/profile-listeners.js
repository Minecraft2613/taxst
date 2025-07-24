// dom-listeners/profile-listeners.js

export function setupProfileListeners() {
    const PROFILE_FORM = document.getElementById('profile-form');
    const PROFILE_MESSAGE_ELEM = document.getElementById('profile-message');
    const MINECRAFT_USERNAME_INPUT = document.getElementById('minecraft-username');
    const ACCOUNT_NAME_INPUT = document.getElementById('account-name');
    const AVATAR_UPLOAD_INPUT = document.getElementById('avatar-upload');
    const HEADER_PROFILE_AVATAR = document.getElementById('header-profile-avatar');
    const PROFILE_DROPDOWN_MENU = document.getElementById('profile-dropdown-menu');
    const HEADER_PROFILE_DISPLAY = document.getElementById('header-profile-display');

    PROFILE_FORM.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser || !userProfile) {
            showCustomMessage(PROFILE_MESSAGE_ELEM, 'Please log in first.', 'error');
            return;
        }

        const updatedProfile = {
            minecraftUsername: MINECRAFT_USERNAME_INPUT.value,
            accountName: ACCOUNT_NAME_INPUT.value,
            avatar: userProfile.avatar
        };

        const response = await simulatedCloudflareApi.updateProfile(currentUser.email, updatedProfile);

        if (response.success) {
            userProfile = response.user;
            renderProfile();
            showCustomMessage(PROFILE_MESSAGE_ELEM, 'Profile saved successfully!', 'success');
        } else {
            showCustomMessage(PROFILE_MESSAGE_ELEM, response.message, 'error');
        }
    });

    AVATAR_UPLOAD_INPUT.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file && currentUser && userProfile) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const avatarDataUrl = event.target.result;
                const updatedProfile = { ...userProfile, avatar: avatarDataUrl };

                const response = await simulatedCloudflareApi.updateProfile(currentUser.email, updatedProfile);

                if (response.success) {
                    userProfile = response.user;
                    updateAvatarDisplay(userProfile.avatar, currentUser.email);
                    showCustomMessage(PROFILE_MESSAGE_ELEM, 'Profile picture updated!', 'success');
                } else {
                    showCustomMessage(PROFILE_MESSAGE_ELEM, response.message, 'error');
                }
            };
            reader.readAsDataURL(file);
        } else if (!currentUser) {
            showCustomMessage(PROFILE_MESSAGE_ELEM, 'Please log in to upload an avatar.', 'error');
        }
    });

    if (HEADER_PROFILE_AVATAR) {
        HEADER_PROFILE_AVATAR.addEventListener('click', (e) => {
            e.stopPropagation();
            PROFILE_DROPDOWN_MENU.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!HEADER_PROFILE_DISPLAY.contains(e.target)) {
                PROFILE_DROPDOWN_MENU.classList.remove('active');
            }
        });
    }
}