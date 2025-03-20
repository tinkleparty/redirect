async function generateCode() {
    const link = document.getElementById('linkInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!link) {
        resultDiv.innerHTML = "❌ Please enter a valid link.";
        return;
    }

    // Generate random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Get existing codes
    const response = await fetch('https://raw.githubusercontent.com/nawsomey/redirect/main/codes.json');
    const data = await response.json();

    // Add new code and link
    data[code] = link;

    // Prepare updated JSON
    const updatedJSON = JSON.stringify(data, null, 4);

    // Save JSON back to GitHub (via API or manually)
    await uploadToGitHub(updatedJSON);

    resultDiv.innerHTML = `✅ Code generated: <b>${code}</b><br>Use this code to access the link!`;
}

// Upload updated JSON to GitHub
async function uploadToGitHub(updatedJSON) {
    const githubAPI = 'https://api.github.com/repos/nawsomey/redirect/contents/codes.json';
    const token = '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';

    // Get current file SHA
    const response = await fetch(githubAPI, {
        headers: { Authorization: `token ${token}` }
    });
    const fileData = await response.json();
    const sha = fileData.sha;

    //
