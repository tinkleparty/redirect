async function checkCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const copyBtn = document.getElementById('copyBtn');

    // Fetch codes from GitHub JSON
    try {
        const response = await fetch('https://raw.githubusercontent.com/yourusername/yourrepo/main/codes.json');
        const data = await response.json();

        if (data[code]) {
            const link = data[code];
            document.getElementById('codeInput').value = link;
            resultDiv.innerHTML = "✅ Link generated successfully!<br>Copy and paste it in your browser.";
            copyBtn.style.display = 'inline-block';
        } else {
            resultDiv.innerHTML = "❌ Invalid code. Try again.";
            copyBtn.style.display = 'none';
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error fetching codes. Please try again later.";
