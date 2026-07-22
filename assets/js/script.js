/*
  Copyright (c) 2026 Smart IoT Project Authors. All Rights Reserved.
  This source code is proprietary and confidential.
  Unauthorized copying of this file, via any medium is strictly prohibited.
*/
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending Message...';
        btn.style.opacity = '0.8';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            btn.innerText = 'Message Sent Successfully!';
            btn.style.background = 'linear-gradient(90deg, #10b981, #059669)'; 
            btn.style.color = '#fff';
            btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            contactForm.reset();
            
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

document.querySelectorAll('.booklet-info, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

const watermark = document.createElement('div');
watermark.className = 'site-watermark';
watermark.innerHTML = '<div class="watermark-content"><i class="fas fa-code"></i><div class="text-group"><span>Developed By</span><strong>Mohamed Elsayed</strong></div></div>';
document.body.appendChild(watermark);

const teamImages = document.querySelectorAll('.team-card img');
if (teamImages.length > 0) {
    teamImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            const title = img.getAttribute('title');
            if (title && title.includes('-')) {
                const arabicName = title.split('-')[1].trim();
                
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                }
                
                const utterance = new SpeechSynthesisUtterance(arabicName);
                utterance.lang = 'ar-SA'; // Arabic language
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }
        });

    });
}

