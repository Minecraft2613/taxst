// home/server/live-data.js

function copyToClipboard(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showCustomAlert('Copied!', 'Text copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showCustomAlert('Error', 'Failed to copy text.');
    });
}
