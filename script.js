document.addEventListener('DOMContentLoaded', function() {

    // --- Preloader Logic ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        preloader.classList.add('loaded');
    });
    document.body.classList.add('loading');


    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });


    // --- Typed.js for Hero Section ---
    new Typed('#typed-text', {
        strings: ["elegant code.", "creative solutions.", "scalable systems.", "innovative products."],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 2200,
    });


    // --- Scroll-triggered Animations ---
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null,
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });


    // --- Parallax Gradient Blobs ---
    const gradients = document.querySelectorAll('.gradients-container > div');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        
        gradients.forEach((g, i) => {
            const factor = 10 + (i * 5);
            g.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });


    // --- Back to Top Button ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- MOBILE NAVIGATION TOGGLE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('nav-open');
        document.body.classList.toggle('nav-open'); // To prevent scrolling
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('nav-open')) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('nav-open');
                document.body.classList.remove('nav-open');
            }
        });
    });
});