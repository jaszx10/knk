/**
 * TVS iQube Product Details Logic
 */

const bikeData = {
    colors: [
        { name: "Pearl White", hex: "#fcfcfc", folder: "PearlWhite", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Titanium Grey", hex: "#666666", folder: "TitaniumGrey", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Walnut Brown", hex: "#5c4033", folder: "WalnutBrown", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] }
    ],
    specs: [
        {
            category: "Motor & Performance",
            items: [
                { label: "Motor Type", value: "Brushless DC Hub Motor" },
                { label: "Maximum Power", value: "4.4 kW" },
                { label: "Maximum Torque", value: "140 Nm" },
                { label: "Top Speed", value: "78 kmph" },
                { label: "Transmission", value: "Automatic" }
            ]
        },
        {
            category: "Battery & Charging",
            items: [
                { label: "Battery Capacity", value: "2.2 kWh Lithium ion" },
                { label: "Range", value: "75 km/charge" },
                { label: "Charging Time (0-100%)", value: "2.75 Hr" }
            ]
        },
        {
            category: "Chassis & Electronics",
            items: [
                { label: "Front Suspension", value: "Telescopic Fork" },
                { label: "Rear Suspension", value: "Dualshock" },
                { label: "Front Brake", value: "220 mm Disc" },
                { label: "Rear Brake", value: "130 mm Drum" },
                { label: "Console", value: "Turn by Turn Navigation, Remote Charge Status" }
            ]
        }
    ]
};

let currentState = {
    colorIndex: 0,
    slideIndex: 0
};

function initProductPage() {
    renderColorSelector();
    renderSpecs();
    selectColor(0);
}

function renderColorSelector() {
    const container = document.getElementById('colorSelector');
    container.innerHTML = bikeData.colors.map((color, index) => `
        <div class="color-swatch ${index === 0 ? 'active' : ''}" 
             style="background-color: ${color.hex}" 
             onclick="selectColor(${index})"
             title="${color.name}">
        </div>
    `).join('');
}

function selectColor(index) {
    currentState.colorIndex = index;
    currentState.slideIndex = 0;

    document.querySelectorAll('.color-swatch').forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    document.getElementById('selectedColorName').innerText = bikeData.colors[index].name;

    updateGallery();
}

function renderSpecs() {
    const container = document.getElementById('specsGrid');
    container.innerHTML = bikeData.specs.map(cat => `
        <div class="spec-category-card">
            <h3 class="text-primary font-black text-lg mb-6 uppercase tracking-wider">${cat.category}</h3>
            <div class="space-y-1">
                ${cat.items.map(item => `
                    <div class="spec-row">
                        <span class="spec-label">${item.label}</span>
                        <span class="spec-value">${item.value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function updateGallery() {
    const color = bikeData.colors[currentState.colorIndex];
    const track = document.getElementById('productCarousel');
    const dotsContainer = document.getElementById('carouselDots');

    track.innerHTML = color.images.map(img => `
        <div class="product-carousel-slide">
            <img src="assets/images/page_images/IQube/${color.folder}/${img}" alt="TVS iQube ${color.name}">
        </div>
    `).join('');

    dotsContainer.innerHTML = color.images.map((_, i) => `
        <div class="w-2 h-2 rounded-full bg-slate-200 transition-all ${i === 0 ? 'w-6 bg-primary' : ''}"></div>
    `).join('');

    currentState.slideIndex = 0;
    track.style.transform = `translateX(0)`;
}

function nextSlide() {
    const color = bikeData.colors[currentState.colorIndex];
    currentState.slideIndex = (currentState.slideIndex < color.images.length - 1)
        ? currentState.slideIndex + 1
        : 0;
    applySlide();
}

function prevSlide() {
    const color = bikeData.colors[currentState.colorIndex];
    currentState.slideIndex = (currentState.slideIndex > 0)
        ? currentState.slideIndex - 1
        : color.images.length - 1;
    applySlide();
}

function applySlide() {
    const track = document.getElementById('productCarousel');
    const dots = document.querySelectorAll('#carouselDots div');

    track.style.transform = `translateX(-${currentState.slideIndex * 100}%)`;

    dots.forEach((dot, i) => {
        dot.className = `w-2 h-2 rounded-full bg-slate-200 transition-all ${i === currentState.slideIndex ? 'w-6 bg-primary' : ''}`;
    });
}

document.addEventListener('DOMContentLoaded', initProductPage);
