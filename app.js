let generatedLink = ""; // store the generated link

async function checkCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const submitBtn = document.getElementById('submitBtn');
    const openPageBtn = document.getElementById('openPageBtn');

    try {
        const response = await fetch('https://raw.githubusercontent.com/nawsomey/redirect/main/codes.json');
        const data = await response.json();

        if (data[code]) {
            generatedLink = data[code];
            document.getElementById('codeInput').value = generatedLink;
            resultDiv.innerHTML = "✅ Link generated successfully!";

            // Change Submit → Copy Link
            submitBtn.innerHTML = "Copy Link";
            submitBtn.onclick = () => copyLink(generatedLink);
            submitBtn.style.backgroundColor = "#4CAF50";

            // Show Open Page button
            openPageBtn.classList.remove("hidden");

            showNotification("✅ Valid code! Link generated.", "success");
        } else {
            resultDiv.innerHTML = "❌ Invalid code. Try again.";
            showNotification("❌ Invalid code. Please try again.", "error");

            // Hide Open Page button if invalid
            openPageBtn.classList.add("hidden");
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error fetching codes. Please try again later.";
        showNotification("⚠️ Error fetching codes. Try again later.", "error");
    }
}

function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        showNotification("🔗 Link copied to clipboard!", "success");
    }).catch(err => {
        console.error("Error copying link:", err);
    });
}

function openPage() {
    if (generatedLink) {
        const newTab = window.open("about:blank", "_blank");
        newTab.document.write(`<iframe src="${generatedLink}" style="border:none;width:100%;height:100vh;"></iframe>`);
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
