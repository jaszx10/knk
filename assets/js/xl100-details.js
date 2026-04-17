/**
 * TVS XL100 Product Details Logic
 */

const bikeData = {
    colors: [
        { name: "Beaver Brown", hex: "#5c4033", folder: "BeaverBrown", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"] },
        { name: "Black", hex: "#000000", folder: "Black", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Blue", hex: "#0000ff", folder: "Blue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Delight Blue", hex: "#1e90ff", folder: "DelightBlue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Green", hex: "#008000", folder: "Green", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Luster Gold", hex: "#ffd700", folder: "LusterGold", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Mineral Purple", hex: "#8a2be2", folder: "MineralPurple", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Mint Blue", hex: "#98ff98", folder: "MintBlue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Red", hex: "#ff0000", folder: "Red", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] }
    ],
    specs: [
        {
            category: "Engine & Performance",
            items: [
                { label: "Engine Type", value: "Four-Stroke" },
                { label: "Engine Capacity", value: "99.7 cc" },
                { label: "Maximum Power", value: "4.3 bhp @ 6000 RPM" },
                { label: "Maximum Torque", value: "6.5 Nm @ 3500 RPM" },
                { label: "Transmission", value: "Single Speed / Non Gear" },
                { label: "Clutch Type", value: "Centrifugal type Wet Clutch" },
                { label: "Fuel System", value: "Carburettor" },
                { label: "Cooling System", value: "Air Cooled" }
            ]
        },
        {
            category: "Chassis & Suspension",
            items: [
                { label: "Front Suspension", value: "Telescopic Hydraulic Spring Type" },
                { label: "Rear Suspension", value: "Swing Arm with Hydraulic Shocks" },
                { label: "Front Brake", value: "Drum" },
                { label: "Rear Brake", value: "Drum" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "1895 mm" },
                { label: "Width", value: "670 mm" },
                { label: "Height", value: "1077 mm" },
                { label: "Kerb Weight", value: "89 kg" },
                { label: "Fuel Tank Capacity", value: "4 L" }
            ]
        },
        {
            category: "Tyres & Electric",
            items: [
                { label: "Front Tyre", value: "2.50-16 - 6 PR 41L Tubed" },
                { label: "Rear Tyre", value: "2.50-16 - 6 PR 41L Tubed" },
                { label: "Wheel Type", value: "Steel Wheels" },
                { label: "Headlamp", value: "LED Lamp" },
                { label: "Battery", value: "12 V" }
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
            <img src="assets/images/page_images/XL100/${color.folder}/${img}" alt="TVS XL100 ${color.name}">
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
