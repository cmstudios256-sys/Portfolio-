// Wait for the entire page content to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const qrButton = document.getElementById('qr-button');
    const qrModal = document.getElementById('qr-modal');
    const closeQrModalButton = document.getElementById('close-qr-modal');
    const qrCodeContainer = document.getElementById('qrcode');
    const qrLinkDisplay = document.getElementById('qr-link-display');
    
    // Function to show the QR Code modal and generate the code
    function showQrCode() {
        // Get the current URL. This is the portfolio link clients will scan.
        const portfolioUrl = window.location.href;

        // 1. Clear previous QR code if any
        qrCodeContainer.innerHTML = ''; 

        // 2. Generate the QR Code using qrcode.js
        try {
            // Note: The QRCode function is available because of the CDN link in index.html
            new QRCode(qrCodeContainer, {
                text: portfolioUrl,
                width: 200,
                height: 200,
                colorDark : "#333333", // Dark color for the code pattern
                colorLight : "#ffffff", // Light color for the background
                correctLevel : QRCode.CorrectLevel.H
            });

            // 3. Display the URL below the code for reference
            qrLinkDisplay.textContent = portfolioUrl;
            
            // 4. Show the modal
            qrModal.classList.remove('hidden');

        } catch (error) {
            console.error("Error generating QR code:", error);
            // Handle error without using alert()
            qrLinkDisplay.textContent = "Could not generate QR code. Please share the URL manually: " + portfolioUrl;
            qrModal.classList.remove('hidden');
        }
    }

    // Function to hide the QR Code modal
    function hideQrCode() {
        qrModal.classList.add('hidden');
    }

    // --- Event Listeners ---
    
    // 1. Event listener for the main "Share QR" button in the header
    qrButton.addEventListener('click', showQrCode);
    
    // 2. Event listener for the close button inside the modal
    closeQrModalButton.addEventListener('click', hideQrCode);
    
    // 3. Event listener to hide modal when clicking on the dark backdrop
    qrModal.addEventListener('click', (e) => {
        // If the click target is the backdrop itself (not the content inside)
        if (e.target.id === 'qr-modal') {
            hideQrCode();
        }
    });
});