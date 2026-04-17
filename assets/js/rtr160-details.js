/**
 * TVS Apache RTR 160 Product Details Logic
 */

const bikeData = {
    colors: [
        { name: "Gloss Black", hex: "#000000", folder: "GlossBlack", images: ["1.webp", "2.webp", "3.webp", "4.webp"] },
        { name: "Gloss Black & Red", hex: "#3a0000", folder: "GlossBlack&Red", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] },
        { name: "Matte Blue", hex: "#000080", folder: "MatteBLue", images: ["1.webp", "2.webp"] },
        { name: "Matte Black", hex: "#262626", folder: "MatteBlack", images: ["1.webp", "2.webp"] },
        { name: "Pearl White", hex: "#fcfcfc", folder: "PearlWHite", images: ["1.webp", "2.webp", "3.webp", "4.webp"] },
        { name: "Racing Red", hex: "#cc0000", folder: "RacingREd", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] },
        { name: "Titanium Grey", hex: "#666666", folder: "TitaniumGrey", images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] }
    ],
    specs: [
        {
            category: "Engine & Performance",
            items: [
                { label: "Engine Type", value: "SI, 4 stroke, Air cooled, SOHC, Fuel Injection" },
                { label: "Engine Capacity", value: "160 cc" },
                { label: "Maximum Power", value: "15.8 bhp @ 8750 RPM" },
                { label: "Maximum Torque", value: "13.85 Nm @ 7000 RPM" },
                { label: "Bore X Stroke", value: "62 mm X 52.9 mm" },
                { label: "Compression Ratio", value: "10:1" },
                { label: "Transmission", value: "5-speed" },
                { label: "Clutch Type", value: "Wet type, multi-plate" }
            ]
        },
        {
            category: "Chassis & Suspension",
            items: [
                { label: "Frame Type", value: "Double cradle Synchro Stiff" },
                { label: "Front Suspension", value: "Telescopic" },
                { label: "Rear Suspension", value: "Monoshock" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "2085 mm" },
                { label: "Width", value: "730 mm" },
                { label: "Height", value: "1105 mm" },
                { label: "Wheelbase", value: "1300 mm" },
                { label: "Ground Clearance", value: "180 mm" },
                { label: "Seat Height", value: "790 mm" },
                { label: "Kerb Weight", value: "138 kg" },
                { label: "Fuel Tank Capacity", value: "12 L" }
            ]
        },
        {
            category: "Tyres & Brakes",
            items: [
                { label: "Front Tyre", value: "90/90-17 Tubeless" },
                { label: "Rear Tyre", value: "120/70- 17 Tubeless" },
                { label: "Front Brake", value: "270 mm Disc" },
                { label: "Rear Brake", value: "200 mm Disc" },
                { label: "ABS", value: "Single Channel ABS" }
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
            <img src="assets/images/page_images/RTR160/${color.folder}/${img}" alt="TVS Apache RTR 160 ${color.name}">
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
