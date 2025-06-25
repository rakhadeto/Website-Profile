// Background animation
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

        bgAnimation.appendChild(particle);
    }
}

// Social links toggle
const socialTrigger = document.getElementById('socialTrigger');
const socialLinks = document.getElementById('socialLinks');
let isOpen = false;

socialTrigger.addEventListener('click', function() {
    isOpen = !isOpen;
    
    if (isOpen) {
        socialLinks.classList.add('active');
        socialTrigger.innerHTML = '<i class="fas fa-times"></i> Close';
        // WARNA TOMBOL 'CLOSE' UNTUK OPSI 2
        socialTrigger.style.background = 'linear-gradient(45deg, #FF0055, #D1002A)'; 
    } else {
        socialLinks.classList.remove('active');
        socialTrigger.innerHTML = '<i class="fas fa-share-alt"></i> Connect With Me';
        socialTrigger.style.background = 'linear-gradient(45deg, #4dd0e1, #00bcd4)'; // Warna default tombol
    }
});

// Close social links when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.social-container') && isOpen) {
        socialLinks.classList.remove('active');
        socialTrigger.innerHTML = '<i class="fas fa-share-alt"></i> Connect With Me';
        socialTrigger.style.background = 'linear-gradient(45deg, #4dd0e1, #00bcd4)'; // Warna default tombol
        isOpen = false;
    }
});

// Add click effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation (CSS ditambahkan via JS karena dinamis)
// Bagian ini harus tetap di JavaScript karena membuat style dinamis
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Add typing effect to description
const description = document.querySelector('.profile-description');
const text = description.textContent;
description.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        description.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});