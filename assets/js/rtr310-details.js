/**
 * TVS Apache RTR 310 Product Details Logic
 */

const bikeData = {
    colors: [
        {
            name: "Arsenal Black",
            hex: "#1c1c1e",
            folder: "Arsenal_Black",
            images: ["1.webp", "2.webp"]
        },
        {
            name: "Fiery Red",
            hex: "#bb0013",
            folder: "Fiery_Red",
            images: ["1.webp", "2.webp", "3.webp", "4.webp"]
        },
        {
            name: "Fury Yellow",
            hex: "#f5c518",
            folder: "Fury_Yellow",
            images: ["1.webp", "2.webp", "3.webp", "4.webp"]
        }
    ],
    specs: [
        {
            category: "Engine & Transmission",
            items: [
                { label: "Engine Technology", value: "Single Cylinder, 4 Stroke, Liquid Cooled, Fuel Injected" },
                { label: "Engine Capacity", value: "312.12 cc" },
                { label: "Maximum Power", value: "35.6 PS @ 9700 rpm (Sport/Track/SuperMoto)" },
                { label: "Maximum Torque", value: "28.7 Nm @ 6650 rpm" },
                { label: "Transmission", value: "6-Speed Gearbox" },
                { label: "Clutch", value: "RT Slipper Clutch, Wet Multi Plate 7-Plate" },
                { label: "Cooling System", value: "Liquid Cooled" },
                { label: "Fuel System", value: "Closed Loop EFI" },
                { label: "Compression Ratio", value: "12.17:1" },
                { label: "Bore × Stroke", value: "80 mm × 62.1 mm" }
            ]
        },
        {
            category: "Chassis, Suspension & Brakes",
            items: [
                { label: "Frame Type", value: "Hybrid Trellis & Cast Frame, Split Chassis" },
                { label: "Front Suspension", value: "USD Fork" },
                { label: "Rear Suspension", value: "Monoshock" },
                { label: "Front Tyre", value: "110/70-R17 (Michelin Road 5)" },
                { label: "Rear Tyre", value: "150/60-R17 (Michelin Road 5)" },
                { label: "Wheel Type", value: "Alloy Wheels, Tubeless" },
                { label: "Brakes (Front)", value: "300 mm Disc" },
                { label: "Brakes (Rear)", value: "240 mm Disc" },
                { label: "ABS", value: "Dual Channel ABS" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "1991 mm" },
                { label: "Width", value: "831 mm" },
                { label: "Height", value: "1154 mm" },
                { label: "Wheelbase", value: "1358 mm" },
                { label: "Ground Clearance", value: "180 mm" },
                { label: "Seat Height", value: "800 mm" },
                { label: "Kerb Weight", value: "169 kg" },
                { label: "Fuel Tank Capacity", value: "11 L (Reserve: 1 L)" },
                { label: "Engine Oil Capacity", value: "1.8 L" },
                { label: "Maximum Speed", value: "150 kmph" }
            ]
        },
        {
            category: "Electricals & Features",
            items: [
                { label: "Headlamp", value: "Adaptive Class D Bi-LED Reflectors" },
                { label: "Tail Lamp", value: "Dynamic Twin LED" },
                { label: "Indicators", value: "Sequential LED" },
                { label: "Battery", value: "12 V" },
                { label: "Console", value: "5 inch TFT Display" },
                { label: "Ignition", value: "Self Start" }
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
            <img src="assets/images/page_images/RTR310/${color.folder}/${img}" alt="TVS Apache RTR 310 ${color.name}">
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
