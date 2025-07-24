// dom-listeners/contact-listeners.js

export function setupContactListeners() {
    const contactUsForm = document.getElementById("contact-us-form");
    const contactUsStatus = document.getElementById("contact-us-status");

    contactUsForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const minecraftUsername = document.getElementById("contact-minecraft-username").value.trim();
        const discordId = document.getElementById("contact-discord-id").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!minecraftUsername || !discordId || !message) {
            showCustomMessage(contactUsStatus, '⚠️ Please fill in all required fields.', 'error');
            return;
        }

        const fullMessage = `📧 **NEW CONTACT US MESSAGE** 📧\n**Submitted By Email:** ${currentUser ? currentUser.email : 'Not Logged In'} (UID: ${currentUser ? currentUser.uid : 'N/A'})\n**Minecraft User:** ${minecraftUsername}\n**Discord ID:** ${discordId}\n**Message:**\n${message}`;

        fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: fullMessage })
        })
        .then(res => {
            if (res.ok) {
                showCustomMessage(contactUsStatus, '✅ Message sent successfully! We\'ll get back to you soon.', 'success');
                contactUsForm.reset();
            } else {
                showCustomMessage(contactUsStatus, '❌ Failed to send. Try again later.', 'error');
            }
        })
        .catch(error => {
            console.error("Contact form error:", error);
            showCustomMessage(contactUsStatus, '❌ Error sending message.', 'error');
        });
    });
}
