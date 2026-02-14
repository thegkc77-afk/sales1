// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('mobile-active');
    mobileMenuToggle.classList.toggle('active');

    // Change icon
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('mobile-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});


// Form submission handler
const bookingForm = document.getElementById('serviceBookingForm');

bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Create WhatsApp message
    const whatsappMessage = `*New Service Booking Request*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Address:* ${formData.address}%0A` +
        `*Service Needed:* ${formData.service}%0A` +
        `*Message:* ${formData.message || 'N/A'}`;

    // WhatsApp number (replace with actual number)
    const whatsappNumber = '919955556049';

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    // Show success message
    alert('Thank you! Your booking request has been sent. We will contact you shortly.');

    // Reset form
    bookingForm.reset();
});

// Phone number validation
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, '');

    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }

    e.target.value = value;
});

// Add animation on scroll for service and product cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.service-card, .product-card, .feature-item, .contact-item');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Click tracking for analytics (optional - can be connected to Google Analytics)
function trackClick(action, label) {
    console.log(`Action: ${action}, Label: ${label}`);

    // If you have Google Analytics installed, uncomment below:
    // gtag('event', action, {
    //     'event_category': 'engagement',
    //     'event_label': label
    // });
}

// Track CTA clicks
document.querySelectorAll('.btn-call-header, .floating-call').forEach(btn => {
    btn.addEventListener('click', () => trackClick('call_click', 'header_or_floating'));
});

document.querySelectorAll('.btn-whatsapp-header, .floating-whatsapp, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => trackClick('whatsapp_click', 'header_or_floating'));
});

document.querySelectorAll('.btn-service').forEach(btn => {
    btn.addEventListener('click', () => trackClick('service_booking_click', btn.closest('.service-card').querySelector('h3').textContent));
});

document.querySelectorAll('.btn-enquire').forEach(btn => {
    btn.addEventListener('click', () => trackClick('product_enquiry_click', btn.closest('.product-card').querySelector('h3').textContent));
});

// Floating buttons animation on page load
window.addEventListener('load', function () {
    const floatingButtons = document.querySelectorAll('.floating-btn');
    floatingButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1)';
        }, 500 + (index * 200));
    });
});

// Initialize floating buttons with hidden state
document.addEventListener('DOMContentLoaded', function () {
    const floatingButtons = document.querySelectorAll('.floating-btn');
    floatingButtons.forEach(btn => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0)';
        btn.style.transition = 'all 0.3s ease';
    });
});
