/**
 * TVS Apache RR 310 Product Details Logic
 */

const bikeData = {
    colors: [
        {
            name: "Bomber Grey",
            hex: "#6b7280",
            folder: "Bomber_Grey",
            images: ["1.webp", "2.webp", "3.webp"]
        },
        {
            name: "Racing Red",
            hex: "#bb0013",
            folder: "Racing_Red",
            images: ["1.webp", "2.webp", "3.webp"]
        }
    ],
    specs: [
        {
            category: "Engine & Transmission",
            items: [
                { label: "Engine Technology", value: "Single Cylinder, 4 Stroke, Liquid Cooled, Fuel Injected" },
                { label: "Engine Capacity", value: "312.2 cc" },
                { label: "Maximum Power", value: "38 PS @ 9800 rpm (Sport/Track Mode)" },
                { label: "Maximum Torque", value: "29 Nm @ 7900 rpm (Sport/Track Mode)" },
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
                { label: "Frame Type", value: "Trellis Frame, Split Chassis" },
                { label: "Front Suspension", value: "Upside Down (USD) Fork" },
                { label: "Rear Suspension", value: "Monoshock" },
                { label: "Front Tyre", value: "110/70-ZR17 M/C 54W (Michelin Road 5)" },
                { label: "Rear Tyre", value: "150/60-ZR17 M/C 66W (Michelin Road 5)" },
                { label: "Wheel Type", value: "Alloy Wheels, Tubeless" },
                { label: "Brakes (Front)", value: "300 mm Disc" },
                { label: "Brakes (Rear)", value: "240 mm Disc" },
                { label: "ABS", value: "Dual Channel ABS" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "2001 mm" },
                { label: "Width", value: "786 mm" },
                { label: "Height", value: "1135 mm" },
                { label: "Wheelbase", value: "1365 mm" },
                { label: "Ground Clearance", value: "180 mm" },
                { label: "Seat Height", value: "810 mm" },
                { label: "Kerb Weight", value: "174 kg" },
                { label: "Fuel Tank Capacity", value: "11 L (Reserve: 1 L)" },
                { label: "Engine Oil Capacity", value: "1.8 L" },
                { label: "Maximum Speed", value: "164 kmph" }
            ]
        },
        {
            category: "Electricals & Features",
            items: [
                { label: "Headlamp", value: "Bi-LED Twin Projector" },
                { label: "Tail Lamp", value: "LED" },
                { label: "Indicators", value: "LED" },
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
            <img src="assets/images/page_images/RR310/${color.folder}/${img}" alt="TVS Apache RR 310 ${color.name}">
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
