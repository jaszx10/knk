/**
 * Models Floating Window - Enhanced Logic
 */

const modelsData = {
    motorbikes: [
        { name: "Apache RTX", img: "assets/images/cover-images/Apache RTX PLP.webp" },
        { name: "Apache RR 310", img: "assets/images/cover-images/RR 310.webp" },
        { name: "Apache RTR 310", img: "assets/images/cover-images/RTR 310.webp" },
        { name: "Apache RTR 200 4V", img: "assets/images/cover-images/Apache RTR 200 4V.webp" },
        { name: "Apache RTR 180", img: "assets/images/cover-images/Apache RTR 180.webp" },
        { name: "Apache RTR 160 4V", img: "assets/images/cover-images/Apache RTR 160 4V.webp" },
        { name: "Apache RTR 160", img: "assets/images/cover-images/Apache RTR 160 2V.webp" },
        { name: "TVS Ronin", img: "assets/images/cover-images/TVS Ronin.webp" },
        { name: "TVS Raider", img: "assets/images/cover-images/TVS Raider.webp" },
        { name: "TVS Radeon", img: "assets/images/cover-images/TVS Radeon.webp" },
        { name: "TVS StaR City+", img: "assets/images/cover-images/TVS STAR CIty.webp" },
        { name: "TVS Sport", img: "assets/images/cover-images/TVS Sport.webp" }
    ],
    scooters: [
        { name: "Jupiter", img: "assets/images/cover-images/Jupiter.webp" },
        { name: "Jupiter 125", img: "assets/images/cover-images/Jupiter 125.webp" },
        { name: "Ntorq 125", img: "assets/images/cover-images/Ntorq.webp" },
        { name: "Ntorq 150", img: "assets/images/cover-images/Ntorq 150.webp" },
        { name: "Zest 110", img: "assets/images/cover-images/zest.webp" }
    ],
    electric: [
        { name: "TVS X", img: "assets/images/cover-images/TVS X.webp" },
        { name: "TVS Orbiter", img: "assets/images/cover-images/TVS Orbiter.webp" },
        { name: "TVS iQube", img: "assets/images/cover-images/Tvs iqube.webp" }
    ],
    mopeds: [
        { name: "TVS XL100", img: "assets/images/cover-images/TVS xl100.webp" }
    ]
};

const modalHTML = `
<div id="modelsModal" class="models-modal-overlay">
    <div class="models-modal-content">
        <div class="close-models-modal" onclick="closeModelsModal()">
            <span class="material-symbols-outlined">close</span>
        </div>
        
        <aside class="models-modal-sidebar">
            <button class="models-category-btn active" onclick="switchCategory('all', this)">
                All Models <span class="material-symbols-outlined">chevron_right</span>
            </button>
            <button class="models-category-btn" onclick="switchCategory('motorbikes', this)">
                Motorbikes <span class="material-symbols-outlined">chevron_right</span>
            </button>
            <button class="models-category-btn" onclick="switchCategory('scooters', this)">
                Scooters <span class="material-symbols-outlined">chevron_right</span>
            </button>
            <button class="models-category-btn" onclick="switchCategory('electric', this)">
                Electric <span class="material-symbols-outlined">chevron_right</span>
            </button>
            <button class="models-category-btn" onclick="switchCategory('mopeds', this)">
                Mopeds <span class="material-symbols-outlined">chevron_right</span>
            </button>
        </aside>

        <main class="models-grid-area">
            <div class="models-grid-header">
                <h2 id="modalCategoryTitle">All Models</h2>
                <div id="modalModelCountLabel">
                    <span id="modalModelCount">0</span>
                    <span class="text-xs uppercase tracking-tighter ml-1">Models</span>
                </div>
            </div>
            <div id="modelsGrid" class="models-grid">
                <!-- Grid items rendered via JS -->
            </div>
        </main>
    </div>
</div>
`;

function initModelsModal() {
    if (!document.getElementById('modelsModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Bind all model references
    document.querySelectorAll('a[href="models.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModelsModal();
        });
    });
}

function openModelsModal() {
    const modal = document.getElementById('modelsModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchCategory('all', document.querySelector('.models-category-btn'));
}

function closeModelsModal() {
    const modal = document.getElementById('modelsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchCategory(category, element) {
    // UI state update
    document.querySelectorAll('.models-category-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const grid = document.getElementById('modelsGrid');
    const title = document.getElementById('modalCategoryTitle');
    const countSpan = document.getElementById('modalModelCount');
    
    grid.innerHTML = '';
    let globalIndex = 0;

    if (category === 'all') {
        title.innerText = "All Models";
        const categories = [
            { id: 'motorbikes', label: 'Motorbikes' },
            { id: 'scooters', label: 'Scooters' },
            { id: 'electric', label: 'Electric' },
            { id: 'mopeds', label: 'Mopeds' }
        ];

        let totalCount = 0;
        categories.forEach(cat => {
            const models = modelsData[cat.id];
            totalCount += models.length;

            // Render Header
            const header = document.createElement('div');
            header.className = 'models-section-heading';
            header.innerText = cat.label;
            grid.appendChild(header);

            // Render models for this category
            models.forEach(model => {
                const card = createModelCard(model, globalIndex++);
                grid.appendChild(card);
            });
        });
        countSpan.innerText = totalCount;
    } else {
        const models = modelsData[category];
        title.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        countSpan.innerText = models.length;

        models.forEach(model => {
            const card = createModelCard(model, globalIndex++);
            grid.appendChild(card);
        });
    }
}

function createModelCard(model, index) {
    const card = document.createElement('div');
    card.className = 'model-card';
    card.style.animationDelay = `${index * 50}ms`;
    
    // Custom handling for models with dedicated pages
    if (model.name === "TVS Ronin") {
        card.onclick = () => {
            window.location.href = "ronin.html";
        };
    } else {
        card.onclick = () => {
            if (window.openBookingModal) {
                openBookingModal(model.name);
                closeModelsModal();
            }
        };
    }
    
    card.innerHTML = `
        <div class="model-card-image-wrapper">
            <img src="${model.img}" alt="${model.name}" loading="lazy">
        </div>
        <h4>${model.name}</h4>
    `;
    
    // Force reflow for animation
    setTimeout(() => card.classList.add('animate'), 10);
    return card;
}

// Initialize
document.addEventListener('DOMContentLoaded', initModelsModal);

// Backdrop close
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modelsModal');
    if (e.target === modal) closeModelsModal();
});
