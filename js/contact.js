
document.getElementById('submitContactForm').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const reason = document.getElementById('raison').value;
    const message = document.getElementById('message').value;

    const formData = {
        email: email,
        reason: reason,
        message: message
    };

    try {
        const response = await fetch('https://127.0.0.1:8000/api/contact/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Afficher le modal en cas de succès
            const modal = new bootstrap.Modal(document.getElementById('ModalContact'));
            modal.show();
            document.getElementById('contactForm').reset();
        } else {
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});
