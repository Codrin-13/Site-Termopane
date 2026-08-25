// Extracted Drupanel Image Sets — PVC Paneluri Ornamentale
const realPvcImages = [
    // Seria timestamp (originale)
    { url: "images/1773044836852_poza_v48t3j.jpg", name: "Seria PVC 101" },
    { url: "images/1773044891984_poza_ye8uys.jpg", name: "Seria PVC 102" },
    { url: "images/1773314586226_poza_cv4f47.jpg", name: "Seria PVC 103" },
    { url: "images/1773045013810_poza_yg0ycd.jpg", name: "Seria PVC 104" },
    { url: "images/1773045079263_poza_ej9j7n.jpg", name: "Seria PVC 105" },
    { url: "images/1773045125300_poza_al85r4.jpg", name: "Seria PVC 106" },
    { url: "images/1773045171190_poza_vdkhet.jpg", name: "Seria PVC 107" },
    { url: "images/1773314763026_poza_voktfb.jpg", name: "Seria PVC 108" },
    { url: "images/1773045257758_poza_zunsi0.jpg", name: "Seria PVC 109" },
    { url: "images/1773045285517_poza_7hrgzi.jpg", name: "Seria PVC 110" },
    // Seria Clasică numerotată
    { url: "images/110_poza_880c2.jpg", name: "Model 110" },
    { url: "images/111_poza_8c59f.jpg", name: "Model 111" },
    { url: "images/112_poza_33650.jpg", name: "Model 112" },
    { url: "images/113_poza_46f4d.jpg", name: "Model 113" },
    { url: "images/114_poza_fab0a.jpg", name: "Model 114" },
    { url: "images/115_poza_540ea.jpg", name: "Model 115" },
    { url: "images/116_poza_afb15.jpg", name: "Model 116" },
    { url: "images/117_poza_29cb7.jpg", name: "Model 117" },
    { url: "images/118_poza_5280d.jpg", name: "Model 118" },
    { url: "images/119_poza_5bdde.jpg", name: "Model 119" },
    { url: "images/120_poza_22060.jpg", name: "Model 120" },
    // Modele cu Nume — PVC
    { url: "images/celia_pvc_poza_f3e48.jpg",           name: "Celia PVC" },
    { url: "images/celia_pvc_l_poza_24cbd.png",         name: "Celia PVC L" },
    { url: "images/selena_pvc_poza_aa950.png",          name: "Selena PVC" },
    { url: "images/selena_pvc_laterala_poza_8dd61.png", name: "Selena PVC L" },
];

// Extracted Drupanel Image Sets — Aluminiu Paneluri Ornamentale
const realAluImages = [
    // Seria Roluite R2500
    { url: "images/r2501_-_roluit_poza_079e0.jpg",  name: "RG 2501" },
    { url: "images/r2502_-_roluit_poza_c8730.jpg",  name: "RG 2502" },
    { url: "images/r2503_-_roluit_poza_1b904.jpg",  name: "RG 2503" },
    { url: "images/r2504_-_roluit_poza_85ddf.jpg",  name: "RG 2504" },
    { url: "images/r2505a_-_roluit_poza_03da3.jpg", name: "RG 2505A" },
    { url: "images/r2505b_-_roluit_poza_d3884.jpg", name: "RG 2505B" },
    { url: "images/r2506_-_roluit_poza_b1184.jpg",  name: "RG 2506" },
    { url: "images/r2507_-_roluit_poza_bcd82.jpg",  name: "RG 2507" },
    { url: "images/r2508_-_roluit_poza_b44b0.jpg",  name: "RG 2508" },
    { url: "images/r2509_-_roluit_poza_db07b.jpg",  name: "RG 2509" },
    { url: "images/r2519_-_roluit_poza_67162.jpg",  name: "RG 2519" },
    // Seria RG 2200
    { url: "images/r2200_poza_8ff11.png", name: "RG 2200" },
    { url: "images/r2201_poza_fd131.png", name: "RG 2201" },
    // Seria DRU Premium
    { url: "images/dru_2501_poza_77d4f.jpg",   name: "DRU 2501" },
    { url: "images/dru_2501_l_poza_77267.jpg", name: "DRU 2501 L" },
    { url: "images/dru_2502_poza_4205b.jpg",   name: "DRU 2502" },
    { url: "images/dru_2502_l_poza_14916.jpg", name: "DRU 2502 L" },
    { url: "images/dru_2001_poza_24604.jpg",   name: "DRU 2001" },
    { url: "images/dru_2002_poza_e3a98.jpg",   name: "DRU 2002" },
    { url: "images/dru_2003_poza_5b558.jpg",   name: "DRU 2003" },
    { url: "images/dru_2004_poza_9273d.jpg",   name: "DRU 2004" },
    // Modele cu Nume — Aluminiu
    { url: "images/celia_aluminiu_poza_f00be.jpg",    name: "Celia Aluminiu" },
    { url: "images/cristina_aluminiu_poza_0e42e.jpg", name: "Cristina Aluminiu" },
    { url: "images/nora_aluminiu_poza_bd763.jpg",     name: "Nora Aluminiu" },
    { url: "images/selena_aluminiu_poza_adce3.jpg",   name: "Selena Aluminiu" },
    { url: "images/anna_poza_9ee0b.jpg",             name: "Anna" },
    { url: "images/anna_l_poza_23b46.jpg",           name: "Anna L" },
    { url: "images/carmen_poza_25251.jpg",           name: "Carmen" },
    { url: "images/cleopatra_poza_8dc58.png",        name: "Cleopatra" },
    { url: "images/greta_poza_6f724.jpg",            name: "Greta" },
];


function loadCatalog(type) {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear existing
    
    // Simulate loading delay for modern JS component feel
    grid.innerHTML = '<div class="loader-wrapper"><div class="spinner"></div></div>';

    setTimeout(() => {
        grid.innerHTML = '';
        const items = type === 'pvc' ? realPvcImages : realAluImages;
        const materialLabel = type === 'pvc' ? 'PVC' : 'Aluminiu';

        items.forEach((item, index) => {
            const delay = (index % 4) * 0.1;
            const imgUrl = item.url;
            const title  = item.name;

            const card = document.createElement('div');
            card.className = 'catalog-card clip-reveal';
            card.style.animationDelay = `${delay}s`;
            card.style.position = 'relative';

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${imgUrl}" alt="${title}" loading="lazy">
                </div>
                <div class="card-details">
                    <h4>${title}</h4>
                    <p>Colecția Premium ${materialLabel}</p>
                </div>
                <div class="card-interactive-overlay">
                    <button
                        class="btn"
                        style="background: rgba(255,255,255,0.15); border: 1.5px solid #fff; color: #fff; backdrop-filter: blur(4px);"
                        data-material="${materialLabel}"
                        data-model="${title}"
                        onclick="window.openChatPreselected(this.dataset.material, this.dataset.model)"
                    >Configurare Personalizată</button>
                </div>
            `;
            grid.appendChild(card);
        });

        if (window.observeElements) window.observeElements();

    }, 800);
}

// Auto-init based on page
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.page === 'catalog-pvc') {
        loadCatalog('pvc');
    } else if (document.body.dataset.page === 'catalog-aluminiu') {
        loadCatalog('aluminiu');
    }
});
