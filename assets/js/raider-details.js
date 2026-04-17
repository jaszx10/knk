/**
 * TVS Raider Product Details Logic
 */

const bikeData = {
    colors: [
        {
            name: "Blazing Blue",
            hex: "#1d4ed8",
            folder: "BLazing_BLue",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Black Panther Edition",
            hex: "#27272a",
            folder: "BlackPanther_edition",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Deadpool Edition",
            hex: "#991b1b",
            folder: "DeadPool",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Fiery Yellow",
            hex: "#fbbf24",
            folder: "Fiery_Yellow",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Ironman Edition",
            hex: "#dc2626",
            folder: "Ironman_Edition",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Nardo Grey",
            hex: "#6b7280",
            folder: "NardoGrey",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Striking Red",
            hex: "#ef4444",
            folder: "StrikingRed",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Wicked Black",
            hex: "#18181b",
            folder: "WickedBlack",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Wolverine Edition",
            hex: "#f59e0b",
            folder: "WolverineEdition",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        }
    ],
    specs: [
        {
            category: "Engine & Transmission",
            items: [
                { label: "Engine Technology", value: "Air and Oil Cooled" },
                { label: "Engine Capacity", value: "124.8 cc" },
                { label: "Maximum Power", value: "8.37 kW @ 7500 rpm" },
                { label: "Maximum Torque", value: "11.75 Nm @ 6000 rpm" },
                { label: "Transmission", value: "5-Speed Gearbox" },
                { label: "Clutch", value: "Wet, Multi Plate" },
                { label: "Fuel Supply", value: "ETFi" },
                { label: "Compression Ratio", value: "10.3:1" },
                { label: "Bore × Stroke", value: "53.5 mm × 55.5 mm" }
            ]
        },
        {
            category: "Chassis, Suspension & Brakes",
            items: [
                { label: "Front Suspension", value: "Telescopic Fork" },
                { label: "Rear Suspension", value: "Monoshock" },
                { label: "Front Tyre", value: "80/100-17 (Tubeless)" },
                { label: "Rear Tyre", value: "100/90-17 (Tubeless)" },
                { label: "Wheel Type", value: "Alloy Wheels" },
                { label: "Brakes (Front)", value: "240 mm Disc" },
                { label: "Brakes (Rear)", value: "130 mm Drum" },
                { label: "ABS", value: "No" },
                { label: "Braking Technology", value: "SBT (Synchronized Braking Technology)" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "2070 mm" },
                { label: "Width", value: "785 mm" },
                { label: "Height", value: "1028 mm" },
                { label: "Wheelbase", value: "1326 mm" },
                { label: "Ground Clearance", value: "180 mm" },
                { label: "Kerb Weight", value: "123 kg" },
                { label: "Fuel Tank Capacity", value: "10 L" },
                { label: "Engine Oil Capacity", value: "1.0 L" }
            ]
        },
        {
            category: "Electricals & Features",
            items: [
                { label: "Headlamp", value: "LED" },
                { label: "Tail Lamp", value: "LED" },
                { label: "Battery", value: "12 V" },
                { label: "Console", value: "Reverse LCD" },
                { label: "Ignition", value: "Self Start" },
                { label: "Key Features", value: "First in segment GTT, 85+ connected features, Multiple ride modes" }
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
            <img src="assets/images/page_images/Raider/${color.folder}/${img}" alt="TVS Raider ${color.name}" onerror="this.parentElement.style.display='none'">
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
