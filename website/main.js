document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Navbar Scroll Effect
       ========================================= */
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    /* =========================================
       Mobile Sticky Call Bar — Hide on scroll down, show on scroll up
       ========================================= */
    const stickyCall = document.querySelector('.mobile-sticky-call');
    if (stickyCall) {
        let lastScrollY  = window.scrollY;
        let ticking      = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentY = window.scrollY;
                    const delta    = currentY - lastScrollY;

                    // Ignore micro-scrolls (< 5px)
                    if (Math.abs(delta) > 5) {
                        if (delta > 0 && currentY > 80) {
                            // Scrolling DOWN — hide the bar
                            stickyCall.classList.add('hide-bar');
                        } else {
                            // Scrolling UP — show the bar
                            stickyCall.classList.remove('hide-bar');
                        }
                        lastScrollY = currentY;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* =========================================
       Scroll Reveal Animations
       ========================================= */
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    window.observeElements = function() {
        const elements = document.querySelectorAll('.reveal, .reveal-delay, .clip-reveal');
        elements.forEach(el => revealOnScroll.observe(el));
    };
    window.observeElements();

    /* =========================================
       Parallax Effect for Backgrounds
       ========================================= */
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrollY * 0.4}px)`;
        });
    });

    /* =========================================
       Magnetic Hover Effect for CTA Button (Optimized)
       ========================================= */
    const magneticBtn = document.querySelector('.sticky-cta');
    if (magneticBtn) {
        let rect;
        let ticking = false;

        magneticBtn.addEventListener('mouseenter', () => {
             rect = magneticBtn.getBoundingClientRect();
        });

        magneticBtn.addEventListener('mousemove', (e) => {
            if (!rect) rect = magneticBtn.getBoundingClientRect();
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        magneticBtn.addEventListener('mouseleave', () => {
            rect = null;
            magneticBtn.style.transform = `translate(0px, 0px) scale(1)`;
        });
    }

    /* =========================================
       Interactive Quote Chat Widget
       ========================================= */
    const WHATSAPP_NUMBER = '40743184174';

    const chatHtml = `
    <button class="chat-fab" id="chatFabBtn" aria-label="Deschide chat oferta">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.239 2 11.5c0 1.938.588 3.743 1.604 5.25L2 22l5.523-1.54A10.13 10.13 0 0 0 12 21c5.523 0 10-4.239 10-9.5S17.523 2 12 2Z"/></svg>
        <span>Cere Oferta</span>
    </button>

    <div class="chat-widget" id="chatWidget">
        <div class="chat-widget-header">
            <div class="chat-widget-info">
                <div class="chat-avatar">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.239 2 11.5c0 1.938.588 3.743 1.604 5.25L2 22l5.523-1.54A10.13 10.13 0 0 0 12 21c5.523 0 10-4.239 10-9.5S17.523 2 12 2Z"/></svg>
                </div>
                <div>
                    <strong>Termopan Premium</strong>
                    <span class="online-badge">&#9679; Online acum</span>
                </div>
            </div>
            <button class="chat-close-btn" id="closeChatBtn">&times;</button>
        </div>

        <div class="chat-messages" id="chatMessages"></div>

        <!-- Step 1: Material -->
        <div class="chat-input-area" id="chatStep1">
            <p class="chat-prompt">Buna! Cu ce material doriti panelul?</p>
            <div class="chat-options-row">
                <button class="chat-chip" data-material="PVC">&#129695; PVC</button>
                <button class="chat-chip" data-material="Aluminiu">&#128297; Aluminiu</button>
            </div>
        </div>

        <!-- Step 1.5: Model -->
        <div class="chat-input-area hidden" id="chatStep15">
            <p class="chat-prompt">Ce model doriti? (scrieti numele sau codul modelului)</p>
            <input type="text" id="modelInput" placeholder="ex. Celia, RG2501, Diana..." />
            <div style="display:flex; gap:0.5rem;">
                <button class="chat-send-btn" id="chatNextModelBtn" style="flex:1">Continua &rarr;</button>
                <button class="chat-skip-btn" id="chatSkipModelBtn">Nu stiu</button>
            </div>
        </div>

        <!-- Step 2: Dimensions -->
        <div class="chat-input-area hidden" id="chatStep2">
            <p class="chat-prompt">Introduceti dimensiunile panelului:</p>
            <div class="chat-dims-row">
                <input type="number" id="panelWidth" placeholder="Latime (mm)" />
                <input type="number" id="panelHeight" placeholder="Inaltime (mm)" />
            </div>
            <button class="chat-send-btn" id="chatNextBtn2">Continua &rarr;</button>
        </div>

        <!-- Step 3: Details + WhatsApp -->
        <div class="chat-input-area hidden" id="chatStep3">
            <p class="chat-prompt">Scrieti orice detaliu suplimentar (culori, finisaj, intrebari):</p>
            <textarea id="freeMessage" rows="3" placeholder="ex. Doresc culoarea antracit, finisaj mat..."></textarea>
            <button class="chat-whatsapp-btn" id="sendWhatsappBtn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Trimite pe WhatsApp
            </button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHtml);

    const chatFab    = document.getElementById('chatFabBtn');
    const chatWidget = document.getElementById('chatWidget');
    const closeBtn   = document.getElementById('closeChatBtn');
    const step1      = document.getElementById('chatStep1');
    const step15     = document.getElementById('chatStep15');
    const step2      = document.getElementById('chatStep2');
    const step3      = document.getElementById('chatStep3');
    const msgs       = document.getElementById('chatMessages');

    let selectedMaterial = '';
    let selectedModel    = '';
    let selectedWidth    = '';
    let selectedHeight   = '';

    function addBubble(text, side) {
        side = side || 'bot';
        const div = document.createElement('div');
        div.className = 'chat-bubble chat-bubble--' + side;
        div.innerText = text;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function showStep(step) {
        [step1, step15, step2, step3].forEach(s => s.classList.add('hidden'));
        step.classList.remove('hidden');
    }

    // Open/close fab
    chatFab.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
        chatFab.style.display = 'none';
        if (msgs.children.length === 0) {
            setTimeout(function() { addBubble('Buna! Sunt aici sa va ajut sa configurati panelul dorit.'); }, 300);
        }
    });

    closeBtn.addEventListener('click', function() {
        chatWidget.classList.remove('open');
        chatFab.style.display = 'flex';
    });

    // Attach .cere-oferta-trigger buttons
    window.attachChatListeners = function() {
        document.querySelectorAll('.cere-oferta-trigger').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                chatWidget.classList.add('open');
                chatFab.style.display = 'none';
                if (msgs.children.length === 0) {
                    setTimeout(function() { addBubble('Buna! Sunt aici sa va ajut sa configurati panelul dorit.'); }, 300);
                }
            });
        });
    };
    window.attachChatListeners();

    /* Pre-selected opener from catalog cards */
    window.openChatPreselected = function(material, modelName) {
        msgs.innerHTML = '';
        selectedMaterial = material;
        selectedModel    = modelName || '';
        selectedWidth    = '';
        selectedHeight   = '';
        showStep(step1);

        chatWidget.classList.add('open');
        chatFab.style.display = 'none';

        setTimeout(function() {
            addBubble('Buna! Ati selectat modelul ' + modelName + ' din catalogul ' + material + '.');
        }, 200);
        setTimeout(function() {
            addBubble('Material: ' + material + ' \u2014 confirmat \u2713', 'user');
        }, 700);
        setTimeout(function() {
            addBubble('Model: ' + modelName + ' \u2014 confirmat \u2713', 'user');
        }, 1000);
        setTimeout(function() {
            addBubble('Perfect! Acum introduceti dimensiunile panelului.');
            showStep(step2);
        }, 1400);
    };

    // Step 1 – material chips
    document.querySelectorAll('#chatStep1 .chat-chip').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            selectedMaterial = e.target.getAttribute('data-material');
            selectedModel = '';
            addBubble(selectedMaterial, 'user');
            setTimeout(function() {
                addBubble('Excelenta alegere! Acum scrieti modelul dorit din gama ' + selectedMaterial + '.');
                document.getElementById('modelInput').value = '';
                showStep(step15);
            }, 400);
        });
    });

    // Step 1.5 – model text input confirm
    document.getElementById('chatNextModelBtn').addEventListener('click', function() {
        var modelVal = document.getElementById('modelInput').value.trim();
        if (!modelVal) { document.getElementById('modelInput').focus(); return; }
        selectedModel = modelVal;
        addBubble(modelVal, 'user');
        setTimeout(function() {
            addBubble('Multumim! Acum introduceti dimensiunile panelului.');
            showStep(step2);
        }, 400);
    });

    // Allow Enter key on model input
    document.getElementById('modelInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') document.getElementById('chatNextModelBtn').click();
    });

    // Step 1.5 – skip model
    document.getElementById('chatSkipModelBtn').addEventListener('click', function() {
        selectedModel = 'Nespecificat';
        addBubble('Nu am decis modelul inca', 'user');
        setTimeout(function() {
            addBubble('Nicio problema! Introduceti dimensiunile panelului.');
            showStep(step2);
        }, 400);
    });

    // Step 2 – dimensions
    document.getElementById('chatNextBtn2').addEventListener('click', function() {
        selectedWidth  = document.getElementById('panelWidth').value;
        selectedHeight = document.getElementById('panelHeight').value;
        if (!selectedWidth || !selectedHeight) {
            alert('Te rugam sa completezi ambele dimensiuni.');
            return;
        }
        addBubble('Latime: ' + selectedWidth + ' mm, Inaltime: ' + selectedHeight + ' mm', 'user');
        setTimeout(function() {
            addBubble('Perfect! Puteti adauga orice detalii suplimentare: culori, finisaj, tip de sticla etc.');
            showStep(step3);
        }, 400);
    });

    // Step 3 – WhatsApp send
    document.getElementById('sendWhatsappBtn').addEventListener('click', function() {
        const freeMsg = document.getElementById('freeMessage').value.trim();
        const message = 'Buna ziua! Doresc o oferta pentru:\n' +
                        '\u2022 Material: ' + selectedMaterial + '\n' +
                        '\u2022 Model: ' + (selectedModel || 'Nespecificat') + '\n' +
                        '\u2022 Dimensiuni: ' + selectedWidth + ' x ' + selectedHeight + ' mm\n' +
                        (freeMsg ? '\u2022 Detalii: ' + freeMsg : '');
        const encoded = encodeURIComponent(message);
        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encoded, '_blank');
    });

    /* =========================================
       Back to Top Button
       ========================================= */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================
       Mobile Hamburger Nav
       ========================================= */
    const hamburger    = document.getElementById('navHamburger');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileClose  = document.getElementById('mobileNavClose');

    if (hamburger && mobileDrawer) {
        hamburger.addEventListener('click', () => mobileDrawer.classList.add('open'));
        if (mobileClose) mobileClose.addEventListener('click', () => mobileDrawer.classList.remove('open'));
        mobileDrawer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => mobileDrawer.classList.remove('open'));
        });
    }

    /* =========================================
       Catalog Filter Bar
       ========================================= */
    const filterBar = document.getElementById('catalogFilterBar');
    if (filterBar) {
        filterBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.catalog-card').forEach(card => {
                const name = card.querySelector('h4')?.textContent?.toLowerCase() || '';
                card.style.display = (filter === 'all' || name.includes(filter)) ? '' : 'none';
            });
        });
    }

    /* =========================================
       Image Fallback for Catalog
       ========================================= */
    window.addImageFallbacks = function() {
        document.querySelectorAll('.card-image-wrapper img').forEach(img => {
            if (!img.dataset.fallbackSet) {
                img.dataset.fallbackSet = '1';
                img.addEventListener('error', function() {
                    this.style.display = 'none';
                    const wrapper = this.closest('.card-image-wrapper');
                    if (wrapper && !wrapper.querySelector('.img-placeholder')) {
                        wrapper.innerHTML = '<div class="img-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Imagine indisponibila</span></div>';
                    }
                });
            }
        });
    };

    const origObserve = window.observeElements;
    window.observeElements = function() {
        origObserve && origObserve();
        window.addImageFallbacks && window.addImageFallbacks();
    };

    /* =========================================
       Stat Counter Animation
       ========================================= */
    const statItems = document.querySelectorAll('.stat-item[data-count]');
    if (statItems.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const numEl = el.querySelector('.stat-num');
                if (!numEl || el.dataset.animated) return;
                el.dataset.animated = '1';

                const duration = 1600;
                const startTime = performance.now();

                function tick(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    numEl.textContent = Math.round(ease * target).toLocaleString('ro-RO');
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        numEl.textContent = target.toLocaleString('ro-RO');
                    }
                }
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            });
        }, { threshold: 0.5 });
        statItems.forEach(el => counterObserver.observe(el));
    }

    /* =========================================
       Lightbox for Marquee Images
       ========================================= */
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg     = document.getElementById('lightboxImg');
    const lightboxClose   = document.getElementById('lightboxClose');
    const lightboxPrev    = document.getElementById('lightboxPrev');
    const lightboxNext    = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (lightboxOverlay && lightboxImg) {
        let lightboxImages = [];
        let lightboxIndex  = 0;

        function buildImageList() {
            const seen = new Set();
            lightboxImages = [];
            document.querySelectorAll('.panels-marquee .panel-thumb img').forEach(img => {
                if (!seen.has(img.src)) {
                    seen.add(img.src);
                    lightboxImages.push(img.src);
                }
            });
        }

        function showLightboxImage() {
            lightboxImg.src = lightboxImages[lightboxIndex];
            lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
        }

        function openLightbox(src) {
            buildImageList();
            lightboxIndex = lightboxImages.indexOf(src);
            if (lightboxIndex < 0) lightboxIndex = 0;
            showLightboxImage();
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function goNext() {
            lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
            showLightboxImage();
        }

        function goPrev() {
            lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
            showLightboxImage();
        }

        function attachLightboxListeners() {
            document.querySelectorAll('.panels-marquee .panel-thumb').forEach(thumb => {
                if (thumb.dataset.lightboxReady) return;
                thumb.dataset.lightboxReady = '1';
                thumb.addEventListener('click', () => {
                    const src = thumb.querySelector('img') && thumb.querySelector('img').src;
                    if (src) openLightbox(src);
                });
            });
        }
        attachLightboxListeners();

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxPrev.addEventListener('click', goPrev);
        lightboxNext.addEventListener('click', goNext);

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightboxOverlay.classList.contains('active')) return;
            if (e.key === 'Escape')     closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft')  goPrev();
        });

        let touchStartX = 0;
        lightboxOverlay.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        lightboxOverlay.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) { dx < 0 ? goNext() : goPrev(); }
        });
    }

});
