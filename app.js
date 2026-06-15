document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-btn');
    const menuLinks = document.getElementById('menu-links');
    const links = document.querySelectorAll('.menu-links a');

    // Toggle Mobile Menu
    if (hamburger && menuLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = menuLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuLinks.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuLinks.classList.contains('active') && !menuLinks.contains(e.target) && !hamburger.contains(e.target)) {
                menuLinks.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.servicio-card, .item-beneficio, .galeria-item');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const observerOptions = { 
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, observerOptions);

        // Inject animation styles dynamically (progressive enhancement)
        const style = document.createElement('style');
        style.innerHTML = `
            .servicio-card, .item-beneficio, .galeria-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                will-change: transform, opacity;
            }
            .reveal-active {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
        
        revealElements.forEach(el => observer.observe(el));
    }
});
