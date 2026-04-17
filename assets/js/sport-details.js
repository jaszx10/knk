/**
 * TVS Sport Product Details Logic
 */

const bikeData = {
    colors: [
        { name: "All Black", hex: "#000000", folder: "AllBlack", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"] },
        { name: "All Grey", hex: "#808080", folder: "AllGrey", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"] },
        { name: "All Red", hex: "#ff0000", folder: "AllRed", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"] },
        { name: "Black Neon", hex: "#1a1a1a", folder: "BlackNeon", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] },
        { name: "Grey Red", hex: "#595959", folder: "GreyRed", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"] },
        { name: "Metallic Blue", hex: "#1f51ff", folder: "MetallicBlue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] },
        { name: "Starlight Blue", hex: "#add8e6", folder: "StarlightBLue", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"] },
        { name: "White Purple", hex: "#e6e6fa", folder: "WhitePurple", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"] }
    ],
    specs: [
        {
            category: "Engine & Performance",
            items: [
                { label: "Engine Type", value: "Eco Thrust Fuel Injection, air cooled" },
                { label: "Engine Capacity", value: "109.7 cc" },
                { label: "Maximum Power", value: "8.18 bhp @ 7350 RPM" },
                { label: "Maximum Torque", value: "8.7 Nm @ 4500 RPM" },
                { label: "Bore X Stroke", value: "53.5 mm X 48.8 mm" },
                { label: "Compression Ratio", value: "10.0:1" },
                { label: "Transmission", value: "4-speed constant mesh" },
                { label: "Clutch Type", value: "Wet Multiplate" }
            ]
        },
        {
            category: "Chassis & Suspension",
            items: [
                { label: "Frame Type", value: "Single Cradle Tubular" },
                { label: "Front Suspension", value: "Telescopic Oil-Damped" },
                { label: "Rear Suspension", value: "Hydraulic Shock Absorber" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "1950 mm" },
                { label: "Width", value: "705 mm" },
                { label: "Height", value: "1080 mm" },
                { label: "Wheelbase", value: "1236 mm" },
                { label: "Ground Clearance", value: "175 mm" },
                { label: "Seat Height", value: "790 mm" },
                { label: "Kerb Weight", value: "110 kg" },
                { label: "Fuel Tank Capacity", value: "10 L" }
            ]
        },
        {
            category: "Tyres & Brakes",
            items: [
                { label: "Front Tyre", value: '2.75 x 17" 41P Tubed' },
                { label: "Rear Tyre", value: '3.0 x 17" 50P Tubed' },
                { label: "Front Brake", value: "130 mm Drum" },
                { label: "Rear Brake", value: "110 mm Drum" }
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
            <img src="assets/images/page_images/Sport/${color.folder}/${img}" alt="TVS Sport ${color.name}">
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
