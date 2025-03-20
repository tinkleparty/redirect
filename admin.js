async function generateCode() {
    const link = document.getElementById('linkInput').value.trim();
    const resultDiv = document.getElementById('result');
@@ -11,68 +15,34 @@ async function generateCode() {
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
    const token = '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';  // Use valid token

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
        console.log('Commit Response:', commitResult);  // Log the response for debugging

        if (commitResult.content) {
            return true;
        } else {
            throw new Error('Failed to commit to GitHub');
        }
    } catch (error) {
        console.error("Error uploading to GitHub:", error.message);
        return false;
    }
}
