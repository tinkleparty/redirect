async function generateCode() {
    const link = document.getElementById('linkInput').value.trim();
    const resultDiv = document.getElementById('result');
    const generatedCodeInput = document.getElementById('generatedCode');

    if (!link) {
        showNotification("❌ Please enter a valid link.", "error");
        return;
    }

    // Generate a random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Fetch existing codes from GitHub
    const response = await fetch('https://raw.githubusercontent.com/nawsomey/redirect/main/codes.json');
    const data = await response.json();

    // Add new code and link
    data[code] = link;

    // Prepare updated JSON
    const updatedJSON = JSON.stringify(data, null, 4);

    // Save updated JSON to GitHub (manually replace via API or upload manually)
    await uploadToGitHub(updatedJSON);

    // Show success message and generated code
    generatedCodeInput.value = code;
    generatedCodeInput.style.display = 'block';
    showNotification(`✅ Code generated successfully!`, "success");
}

// Upload updated JSON to GitHub (via API or manual)
async function uploadToGitHub(updatedJSON) {
    const githubAPI = 'https://api.github.com/repos/nawsomey/redirect/contents/codes.json';
    const token = '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';

    // Get current file SHA
    const response = await fetch(githubAPI, {
        headers: { Authorization: `token ${token}` }
    });
    const fileData = await response.json();
    const sha = fileData.sha;

    // Upload updated content
    const commitData = {
        message: "Update codes.json",
        content: btoa(unescape(encodeURIComponent(updatedJSON))),
        sha: sha
    };

    await fetch(githubAPI, {
        method: 'PUT',
        headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commitData)
    });
}

// Show notifications
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.className = type;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
