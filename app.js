async function checkCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const submitBtn = document.getElementById('submitBtn');

    // Special case for 3Dash
    if (code === "3Dash") {
        const win = window.open("about:blank", "_blank");
        if (win) {
            win.document.open();
            win.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/okyesgoogl/amazng@main/style.css">
<script src="https://cdn.jsdelivr.net/gh/okyesgoogl/amazng@main/v2.c68e1234372250dd975a.js"></script>
<style>
canvas:focus { outline: none; }
html, body {
    padding: 0; margin: 0; overflow: hidden;
    -webkit-touch-callout: none; -webkit-user-select: none;
    -khtml-user-select: none; -moz-user-select: none;
    -ms-user-select: none; user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    height: 100%;
}
</style>
</head>
<body>
<!-- Your Unity HTML from request -->
<div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas" tabindex="-1" width="1310" height="836" style="cursor: default;"></canvas>
</div>
<div id="loading-cover" style="background: url('https://raw.githubusercontent.com/Nawsomey/images/refs/heads/main/IMG_2756.jpeg') center center / cover; display: none;">
    <div id="unity-loading-bar">
        <div id="unity-logo"><img src="https://raw.githubusercontent.com/Nawsomey/images/refs/heads/main/cooltext489515884472549.png"></div>
        <div id="unity-progress-bar-empty" style="">
            <div id="unity-progress-bar-full" style="width: 100%;"></div>
        </div>
        <div class="spinner" style="display: none;"></div>
    </div>
</div>
<script>
// full Unity loader script here...
</script>
</body>
</html>
            `);
            win.document.close();
        } else {
            alert("Popup blocked! Please allow popups for this site.");
        }
        return; // don’t continue to GitHub fetch
    }

    // Normal fetch path for other codes
    try {
        const response = await fetch('https://raw.githubusercontent.com/nawsomey/redirect/main/codes.json');
        const data = await response.json();

        if (data[code]) {
            const link = data[code];
            document.getElementById('codeInput').value = link;
            resultDiv.innerHTML = "✅ Link generated successfully!";

            submitBtn.innerHTML = "Copy Link";
            submitBtn.onclick = () => copyLink(link);
            submitBtn.style.backgroundColor = "#4CAF50";
            showNotification("✅ Valid code! Link generated.", "success");
        } else {
            resultDiv.innerHTML = "❌ Invalid code. Try again.";
            showNotification("❌ Invalid code. Please try again.", "error");
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error fetching codes. Please try again later.";
        showNotification("⚠️ Error fetching codes. Try again later.", "error");
    }
}
