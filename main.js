document.addEventListener('DOMContentLoaded', () => {
    // Intro Animation Handling
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        // Animation duration is 4s, plus a small buffer
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 500); // Match CSS fade-out transition
        }, 4200);
    }

    console.log('RDG Website Initialized');

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // Scroll Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('open');
                }
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    // Booking Form Interaction
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            btn.innerText = 'Sending Request...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Request Sent & Confirmed';
                btn.style.backgroundColor = 'var(--color-green)';
                btn.style.borderColor = 'var(--color-green)';
                alert('Thank you! Your viewing request has been received. Our team will contact you shortly.');
            }, 1500);
        });
    }

    // --- AI CHATBOT LOADER (3-Layer Architecture) ---
    function loadAIChat() {
        // Replace with your actual Vercel deployment URL
        const VERCEL_URL = 'https://agent-realty.vercel.app';

        // Inject CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${VERCEL_URL}/static/chat-widget.css`;
        document.head.appendChild(link);

        // Inject JS Loader
        const script = document.createElement('script');
        script.src = `${VERCEL_URL}/static/chat-widget.js`;
        script.onload = () => {
            new AgentChat({
                siteId: 'realty',
                siteName: 'Realty Development Group'
            });
        };
        document.body.appendChild(script);
    }
    loadAIChat();
});
