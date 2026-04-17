/**
 * TVS Zest 110 Product Details Logic
 */

const bikeData = {
    colors: [
        { name: "Bold Black", hex: "#000000", folder: "BoldBlack", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Graphite Grey", hex: "#53565b", folder: "GraphiteGrey", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Matte Blue", hex: "#2a52be", folder: "MatteBLue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Matte Black", hex: "#28282b", folder: "MatteBlack", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Matte Purple", hex: "#4a3556", folder: "MattePurple", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Matte Red", hex: "#990000", folder: "MatteRed", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] },
        { name: "Turquoise Blue", hex: "#40e0d0", folder: "TurquoiseBlue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] }
    ],
    specs: [
        {
            category: "Engine & Performance",
            items: [
                { label: "Engine Type", value: "Four-Stroke" },
                { label: "Engine Capacity", value: "109.7 cc" },
                { label: "Maximum Power", value: "5.75 kW @ 7500 rpm" },
                { label: "Maximum Torque", value: "8.8 Nm @ 5500 rpm" },
                { label: "Transmission", value: "CVT" },
                { label: "Clutch Type", value: "Dry - Centrifugal clutch" },
                { label: "Fuel System", value: "Fuel Injection" },
                { label: "Cooling System", value: "Air Cooled" }
            ]
        },
        {
            category: "Chassis & Suspension",
            items: [
                { label: "Front Suspension", value: "Telescopic" },
                { label: "Rear Suspension", value: "Double Rated Hydraulic Mono Shock" },
                { label: "Front Brake", value: "Drum" },
                { label: "Rear Brake", value: "Drum" },
                { label: "Frame Type", value: "Duplex tubular frame" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "1770 mm" },
                { label: "Width", value: "660 mm" },
                { label: "Height", value: "1139 mm" },
                { label: "Wheelbase", value: "1250 mm" },
                { label: "Ground Clearance", value: "135 mm" },
                { label: "Seat Height", value: "760 mm" },
                { label: "Kerb Weight", value: "102 kg" },
                { label: "Fuel Tank Capacity", value: "5 L" }
            ]
        },
        {
            category: "Tyres & Electric",
            items: [
                { label: "Front Tyre", value: "90 / 100 - 10 Tubeless" },
                { label: "Rear Tyre", value: "90 / 100 - 10 Tubeless" },
                { label: "Wheel Type", value: "Steel Wheels" },
                { label: "Headlamp", value: "LED Lamp" },
                { label: "Tail Lamp", value: "LED Lamp" },
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
            <img src="assets/images/page_images/Zest110/${color.folder}/${img}" alt="TVS Zest 110 ${color.name}">
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
