/**
 * TVS X Product Details Logic
 */

const bikeData = {
    colors: [
        { name: "Red", hex: "#cc0000", folder: "Red", images: ["1.avif"] },
        { name: "Silver", hex: "#c0c0c0", folder: "Silver", images: ["1.avif", "2.avif"] }
    ],
    specs: [
        {
            category: "Motor & Performance",
            items: [
                { label: "Motor Type", value: "PMSM (Permanent Magnet Synchronous Motor)" },
                { label: "Peak Power", value: "11 kW" },
                { label: "Maximum Torque", value: "40 Nm" },
                { label: "Top Speed", value: "105 km/Hr" },
                { label: "Acceleration (0-40 Kmph)", value: "2.6s" }
            ]
        },
        {
            category: "Battery & Charging",
            items: [
                { label: "Battery Capacity", value: "4.44 kWh Li-ion" },
                { label: "Claimed Range", value: "140 km/charge" },
                { label: "Charging Time (0-80%)", value: "4 Hours 30 Minutes" },
                { label: "Charger Output", value: "950 W" }
            ]
        },
        {
            category: "Chassis & Electronics",
            items: [
                { label: "Front Suspension", value: "Telescopic" },
                { label: "Rear Suspension", value: "Mono Shock" },
                { label: "Braking System", value: "Single Channel ABS (Front 220mm, Rear 195mm Disc)" },
                { label: "Console", value: "10.2 Inch TFT Digital Display" },
                { label: "Connectivity", value: "Bluetooth, WiFi, Navigation, OTA" }
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
            <img src="assets/images/page_images/TVS X/${color.folder}/${img}" alt="TVS X ${color.name}">
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
