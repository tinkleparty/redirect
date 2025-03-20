// Initialize Firebase (this code is assumed to be added in your HTML as you provided)
const db = firebase.firestore();

// Function to generate a code
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

    // Save code and link to Firebase
    const success = await saveToFirebase(code, link);

    if (success) {
        // Show success message and generated code
        generatedCodeInput.value = code;
        generatedCodeInput.style.display = 'block';
        showNotification(`✅ Code generated successfully!`, "success");
    } else {
        showNotification("⚠️ Error while saving code to Firebase.", "error");
    }
}

// Function to save the code and link to Firebase Firestore
async function saveToFirebase(code, link) {
    try {
        // Reference to the 'codes' collection in Firestore
        const codesRef = db.collection("codes");

        // Add new document with the generated code as the document ID and the link as the data
        await codesRef.doc(code).set({
            link: link
        });

        console.log('Code saved to Firebase successfully');
        return true;
    } catch (error) {
        console.error('Error saving to Firebase:', error);
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
