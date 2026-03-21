document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navigation & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });


    // --- 2. Countdown Timers ---
    // Helper function to calculate time remaining
    function updateTimer(targetDate, prefix) {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Event has started or passed
            document.getElementById(prefix + 'days').innerText = "00";
            document.getElementById(prefix + 'hours').innerText = "00";
            document.getElementById(prefix + 'minutes').innerText = "00";
            document.getElementById(prefix + 'seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add leading zeros
        document.getElementById(prefix + 'days').innerText = days.toString().padStart(2, '0');
        document.getElementById(prefix + 'hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById(prefix + 'minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById(prefix + 'seconds').innerText = seconds.toString().padStart(2, '0');
    }

    // Main homepage timer (Targeting May 15, 2026 for Coastal Classic)
    const mainTimerElem = document.getElementById('main-timer');
    const eventTargetDate = new Date("May 15, 2026 08:00:00").getTime();

    if (mainTimerElem) {
        updateTimer(eventTargetDate, ''); // initial call
        setInterval(() => updateTimer(eventTargetDate, ''), 1000);
    }

    // Event Page specific timer
    const eventTimerElem = document.getElementById('event-timer');
    if (eventTimerElem) {
        updateTimer(eventTargetDate, 'ev-'); // initial call
        setInterval(() => updateTimer(eventTargetDate, 'ev-'), 1000);
    }


    // --- 3. Scroll Reveal Animations ---
    // Use Intersection Observer for fade-up / fade-in elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .reveal-text');
    animatedElements.forEach(el => animateOnScrollObserver.observe(el));

    // Multi-Level Registration Flow Removed

    // Smooth scroll for anchor links
    document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElem = document.querySelector(targetId);
            if(targetElem) {
                targetElem.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
