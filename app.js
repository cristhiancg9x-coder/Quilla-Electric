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
    const revealElements = document.querySelectorAll('.servicio-card, .item-beneficio, .galeria-item');
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

    // 6. Formulario de Captación de Clientes -> Google Sheets (sin librerías externas)
    // Pega aquí la URL de tu Web App publicada desde Google Apps Script (scripts/google-apps-script.gs)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzgDDvQSQvqkh1o80DFFxogw0d7ylnfwfxMOheI0x_XEgYBjewI7sk3eGqM5NENYpDF-Q/exec';
    const WHATSAPP_NUMBER = '51902330555';

    const leadForm = document.getElementById('lead-form');
    const leadStatus = document.getElementById('lead-status');
    const leadSubmit = document.getElementById('lead-submit');
    const phoneInput = document.getElementById('lead-celular');

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 9);
        });
    }

    function showLeadStatus(type, message, waUrl) {
        if (!leadStatus) return;
        leadStatus.className = `lead-status ${type === 'error' ? 'is-error' : 'is-success'}`;
        leadStatus.textContent = '';

        const msgNode = document.createElement('div');
        msgNode.textContent = message;
        leadStatus.appendChild(msgNode);

        if (waUrl) {
            const waLink = document.createElement('a');
            waLink.href = waUrl;
            waLink.target = '_blank';
            waLink.rel = 'noopener';
            waLink.className = 'lead-status-wa';
            waLink.textContent = '📲 Enviar también por WhatsApp ahora';
            leadStatus.appendChild(waLink);
        }

        leadStatus.hidden = false;
    }

    if (leadForm && leadSubmit) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const honeypot = (document.getElementById('lead-hp')?.value || '').trim();
            if (honeypot) {
                leadForm.reset();
                return;
            }

            const nombre = (document.getElementById('lead-nombre')?.value || '').trim();
            const celular = (document.getElementById('lead-celular')?.value || '').trim();
            const distrito = (document.getElementById('lead-distrito')?.value || '').trim();
            const servicio = (document.getElementById('lead-servicio')?.value || '').trim();
            const detalle = (document.getElementById('lead-detalle')?.value || '').trim();

            if (nombre.length < 2) {
                showLeadStatus('error', 'Por favor ingresa tu nombre y apellido.');
                document.getElementById('lead-nombre')?.focus();
                return;
            }
            if (!/^9\d{8}$/.test(celular)) {
                showLeadStatus('error', 'Ingresa un número de celular válido de Perú (9 dígitos, empieza con 9).');
                phoneInput?.focus();
                return;
            }
            if (!distrito) {
                showLeadStatus('error', 'Por favor selecciona tu distrito en Arequipa.');
                document.getElementById('lead-distrito')?.focus();
                return;
            }
            if (!servicio) {
                showLeadStatus('error', 'Por favor elige el servicio que necesitas.');
                document.getElementById('lead-servicio')?.focus();
                return;
            }

            const waLines = [
                `Hola Quilla Electric, soy ${nombre}.`,
                `Celular: ${celular}`,
                `Distrito: ${distrito}`,
                `Servicio: ${servicio}`
            ];
            if (detalle) waLines.push(`Detalle: ${detalle}`);
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waLines.join('\n'))}`;

            const originalBtnText = leadSubmit.textContent;
            leadSubmit.disabled = true;
            leadSubmit.textContent = 'Enviando solicitud...';

            const isSheetConfigured = GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/');

            if (!isSheetConfigured) {
                showLeadStatus(
                    'success',
                    '✅ Tus datos están listos. Para atención inmediata, envíalos por WhatsApp con un clic (falta conectar la URL de Google Sheets en app.js).',
                    waUrl
                );
                leadSubmit.disabled = false;
                leadSubmit.textContent = originalBtnText;
                return;
            }

            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({
                        nombre,
                        celular,
                        distrito,
                        servicio,
                        detalle,
                        origen: window.location.href
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const result = await response.json().catch(() => null);
                if (result && result.ok === false) {
                    throw new Error(result.error || 'Error en Google Apps Script');
                }

                showLeadStatus(
                    'success',
                    '✅ ¡Recibido! Guardamos tus datos y te contactaremos muy pronto al ' + celular + '.',
                    waUrl
                );
                leadForm.reset();
            } catch (err) {
                showLeadStatus(
                    'error',
                    'No pudimos registrar el formulario automáticamente. Por favor envíanos tus datos directo por WhatsApp aquí:',
                    waUrl
                );
            } finally {
                leadSubmit.disabled = false;
                leadSubmit.textContent = originalBtnText;
            }
        });
    }
});
