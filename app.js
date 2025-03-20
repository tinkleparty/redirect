// Initialize Firebase (assumed to be included in the HTML as you provided earlier)
const db = firebase.firestore();

// Function to check the code
async function checkCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const submitBtn = document.getElementById('submitBtn');

    try {
        // Fetch code from Firebase Firestore
        const codeDoc = await db.collection('codes').doc(code).get();

        if (codeDoc.exists) {
            const link = codeDoc.data().link;
            document.getElementById('codeInput').value = link;
            resultDiv.innerHTML = "✅ Link generated successfully!";

            // Replace Submit button with Copy Link button
            submitBtn.innerHTML = "Copy Link";
            submitBtn.onclick = () => copyLink(link);
            submitBtn.style.backgroundColor = "#4CAF50";
            showNotification("✅ Valid code! Link generated.", "success");
        } else {
            resultDiv.innerHTML = "❌ Invalid code. Try again.";
            showNotification("❌ Invalid code. Please try again.", "error");
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error fetching code. Please try again later.";
        showNotification("⚠️ Error fetching code. Try again later.", "error");
    }
}

// Function to copy the link to the clipboard
function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        showNotification("🔗 Link copied to clipboard!", "success");
    }).catch(err => {
        console.error("Error copying link:", err);
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
