document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-btn');
    const menuLinks = document.getElementById('menu-links');
    const links = document.querySelectorAll('.menu-links a');

    // Toggle Mobile Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // Close menu when clicking a link (Single Page navigation)
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.servicio-card, .item-beneficio, .canchuelos-box, .cta-box');
    
    // Inject dynamic styles for reveal
    const revealStyles = document.createElement('style');
    revealStyles.innerHTML = `
        .servicio-card, .item-beneficio, .canchuelos-box, .cta-box {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .servicio-card.visible, .item-beneficio.visible, .canchuelos-box.visible, .cta-box.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyles);

    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
