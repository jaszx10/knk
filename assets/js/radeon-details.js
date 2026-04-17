/**
 * TVS Radeon Product Details Logic
 */

const bikeData = {
    colors: [
        {
            name: "Black",
            hex: "#18181b",
            folder: "BLack",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Blue Black",
            hex: "#1e3a8a",
            folder: "BlueBlack",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Red Black",
            hex: "#991b1b",
            folder: "RedBlack",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Royal Purple",
            hex: "#581c87",
            folder: "RoyalPurple",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Starlight Blue",
            hex: "#3b82f6",
            folder: "StarlightBLue",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Titanium Grey",
            hex: "#6b7280",
            folder: "TitaniumGrey",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        }
    ],
    specs: [
        {
            category: "Engine & Transmission",
            items: [
                { label: "Engine Technology", value: "Eco thrust Fuel injection, Air cooled" },
                { label: "Engine Capacity", value: "109.7 cc" },
                { label: "Maximum Power", value: "8.18 bhp @ 7350 rpm" },
                { label: "Maximum Torque", value: "8.7 Nm @ 4500 rpm" },
                { label: "Transmission", value: "4-Speed Constant Mesh" },
                { label: "Clutch", value: "Wet Multi Plate" },
                { label: "Cooling System", value: "Air Cooled" },
                { label: "Compression Ratio", value: "10.0:1" },
                { label: "Bore × Stroke", value: "53.5 mm × 48.8 mm" }
            ]
        },
        {
            category: "Chassis, Suspension & Brakes",
            items: [
                { label: "Frame Type", value: "Single Cradle Tubular Layout" },
                { label: "Front Suspension", value: "Telescopic Oil-Damped" },
                { label: "Rear Suspension", value: "Hydraulic Shock Absorber" },
                { label: "Front Tyre", value: "2.75 - 18 42P 4PR (Tubeless)" },
                { label: "Rear Tyre", value: "3.00 - 18 52P 6PR (Tubeless)" },
                { label: "Wheel Type", value: "Alloy Wheels" },
                { label: "Brakes (Front)", value: "130 mm Drum" },
                { label: "Brakes (Rear)", value: "110 mm Drum" },
                { label: "ABS", value: "No" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "2025 mm" },
                { label: "Width", value: "705 mm" },
                { label: "Height", value: "1080 mm" },
                { label: "Wheelbase", value: "1265 mm" },
                { label: "Ground Clearance", value: "180 mm" },
                { label: "Seat Height", value: "780 mm" },
                { label: "Kerb Weight", value: "113 kg" },
                { label: "Fuel Tank Capacity", value: "10 L (Reserve: 2 L)" },
                { label: "Maximum Speed", value: "90 kmph" }
            ]
        },
        {
            category: "Electricals & Features",
            items: [
                { label: "Headlamp", value: "LED" },
                { label: "Tail Lamp", value: "Bulb" },
                { label: "Battery", value: "12 V" },
                { label: "Console", value: "Speedometer: Analogue, Odometer: Digital" },
                { label: "Ignition", value: "Self & Kick Start" }
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
            <img src="assets/images/page_images/Radeon/${color.folder}/${img}" alt="TVS Radeon ${color.name}" onerror="this.parentElement.style.display='none'">
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
