function goToLink() {
    let link = document.getElementById('linkInput').value.trim();
    
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        link = 'https://' + link;
    }
    
    window.location.href = link;
}
