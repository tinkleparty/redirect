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

    // Upload updated JSON to GitHub
    const success = await uploadToGitHub(updatedJSON);

    if (success) {
        // Show success message and generated code
        generatedCodeInput.value = code;
        generatedCodeInput.style.display = 'block';
        showNotification(`✅ Code generated successfully!`, "success");
    } else {
        showNotification("⚠️ Error while committing code to GitHub.", "error");
    }
}

// Upload updated JSON to GitHub
async function uploadToGitHub(updatedJSON) {
    const githubAPI = 'https://api.github.com/repos/nawsomey/redirect/contents/codes.json';
    const token = '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';

    try {
        // Get current file SHA
        const response = await fetch(githubAPI, {
            headers: { Authorization: `token ${token}` }
        });
        const fileData = await response.json();
        const sha = fileData.sha;

        // Commit updated content to GitHub
        const commitData = {
            message: "Update codes.json with new generated code",
            content: btoa(unescape(encodeURIComponent(updatedJSON))),
            sha: sha
        };

        const commitResponse = await fetch(githubAPI, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commitData)
        });

        const commitResult = await commitResponse.json();

        if (commitResult.content) {
            return true;
        } else {
            throw new Error('Failed to commit to GitHub');
        }
    } catch (error) {
        console.error("Error uploading to GitHub:", error);
        return false;
    }
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
