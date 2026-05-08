// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Form submission simulation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        // Change button state
        btn.innerText = 'Sending Message...';
        btn.style.opacity = '0.8';
        btn.style.pointerEvents = 'none';
        
        // Simulate network request
        setTimeout(() => {
            btn.innerText = 'Message Sent Successfully!';
            btn.style.background = 'linear-gradient(90deg, #10b981, #059669)'; 
            btn.style.color = '#fff';
            btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            contactForm.reset();
            
            // Revert button after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.boxShadow = '';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            }, 3000);
        }, 1500);
    });
}

// Add simple scroll animation for elements
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-up animation initial state to elements
document.querySelectorAll('.booklet-info, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add Watermark (محمد السيد)
const watermark = document.createElement('div');
watermark.className = 'site-watermark';
watermark.innerHTML = '<div class="watermark-content"><i class="fas fa-code"></i><div class="text-group"><span>Developed By</span><strong>Mohamed Elsayed</strong></div></div>';
document.body.appendChild(watermark);
