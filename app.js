document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-btn');
    const menuLinks = document.getElementById('menu-links');
    const navAnchors = document.querySelectorAll('.menu-links a');

    function closeMobileMenu() {
        if (!menuLinks || !hamburger) return;
        menuLinks.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // 1. Menú móvil accesible
    if (hamburger && menuLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = menuLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        navAnchors.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('click', (e) => {
            if (menuLinks.classList.contains('active') && !menuLinks.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // 2. Animación progresiva sin parpadeo ni estilos inyectados en carga
    const revealElements = document.querySelectorAll('.servicio-card, .item-beneficio, .galeria-item, .resena-card');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Solo animamos los elementos que aún están debajo de la pantalla inicial
            if (rect.top > window.innerHeight) {
                el.classList.add('reveal-ready');
                revealObserver.observe(el);
            }
        });
    }

    // 3. Indicador de sección activa en el menú (ScrollSpy)
    const sections = document.querySelectorAll('main section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    const isMatch = a.getAttribute('href') === `#${id}`;
                    a.classList.toggle('nav-active', isMatch);
                });
            });
        }, {
            rootMargin: '-35% 0px -55% 0px'
        });

        sections.forEach(sec => spyObserver.observe(sec));
    }

    // 4. Lightbox accesible para Galería de Trabajos
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const modalClose = document.getElementById('lightbox-close');
    let lastTrigger = null;

    function closeLightbox() {
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        if (modalImg) modalImg.src = '';
        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    }

    if (modal && modalImg && modalCaption && modalClose) {
        document.querySelectorAll('.galeria-trigger').forEach(btn => {
            btn.addEventListener('click', () => {
                const img = btn.querySelector('img');
                if (!img) return;
                lastTrigger = btn;
                modalImg.src = img.currentSrc || img.src;
                modalImg.alt = img.alt;
                modalCaption.textContent = btn.dataset.caption || img.alt;
                modal.hidden = false;
                modalClose.focus();
            });
        });

        modalClose.addEventListener('click', closeLightbox);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });
    }

    // Tecla Escape global (cierra menú móvil o lightbox)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeLightbox();
        }
    });

    // 5. Botón "Volver arriba"
    const btnTop = document.getElementById('btn-top');
    if (btnTop) {
        window.addEventListener('scroll', () => {
            btnTop.hidden = window.scrollY < 500;
        }, { passive: true });

        btnTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
