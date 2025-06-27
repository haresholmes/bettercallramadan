// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'en';

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling
contactForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault();
        showNotification('Please fill in all required fields correctly.', 'error');
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .contact-item, .stat-item, .expertise-item');
    animateElements.forEach(el => observer.observe(el));
});

// Form validation
function validateForm() {
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        
        // Remove existing error states
        formGroup.classList.remove('error', 'success');
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Validate field
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            showFieldError(formGroup, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            formGroup.classList.add('error');
            showFieldError(formGroup, 'Please enter a valid email address');
            isValid = false;
        } else {
            formGroup.classList.add('success');
        }
    });
    
    return isValid;
}

function showFieldError(formGroup, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time form validation
contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        const formGroup = field.closest('.form-group');
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            formGroup.classList.add('error');
            if (!formGroup.querySelector('.error-message')) {
                showFieldError(formGroup, 'This field is required');
            }
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            formGroup.classList.add('error');
            if (!formGroup.querySelector('.error-message')) {
                showFieldError(formGroup, 'Please enter a valid email address');
            }
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) errorMessage.remove();
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the next line to enable typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Better Call Ramadan';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 2rem;
        font-weight: 700;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyles);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.body.style.fontFamily = currentLang === 'ar' ? "'Cairo', 'Tajawal', Arial, sans-serif" : "'Inter', 'Segoe UI', Arial, sans-serif";
    langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    langToggle.classList.toggle('active', currentLang === 'ar');
    // Switch all text
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
}); 