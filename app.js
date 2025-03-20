function goToLink() {
    let link = document.getElementById('linkInput').value.trim();
    
    // Check if the link starts with http:// or https://, otherwise add https://
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        link = 'https://' + link;
    }

    // Open link in a new tab to avoid embedding or modifying
    window.open(link, '_blank');
}
