document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // UI Loading State
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.style.display = 'none';

        try {
            // Validate Form
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            
            if (!name || !email || !formData.get('subject') || !formData.get('message')) {
                throw new Error('Please fill in all fields');
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();
            
            if (response.ok && result.ok) {
                showMessage(`${name}, your message was sent successfully!`, 'success');
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Failed to send message. Please try again later.');
            }
            
        } catch (error) {
            console.error('Form Error:', error);
            showMessage(error.message, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = type;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds with fade effect
        setTimeout(() => {
            formMessage.style.transition = 'opacity 0.5s';
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.style.opacity = '1';
                formMessage.style.transition = '';
            }, 500);
        }, 5000);
    }
});