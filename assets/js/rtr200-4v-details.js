/**
 * TVS Apache RTR 200 4V Product Details Logic
 */

const bikeData = {
    colors: [
        {
            name: "Gloss Black",
            hex: "#1c1c1e",
            folder: "Gloss_Black",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        },
        {
            name: "Matte Blue",
            hex: "#1e3a8a",
            folder: "Matte_Blue",
            images: ["1.webp", "2.webp"]
        },
        {
            name: "Pearl White",
            hex: "#f0f0f0",
            folder: "Pearl_WHite",
            images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"]
        }
    ],
    specs: [
        {
            category: "Engine & Transmission",
            items: [
                { label: "Engine Technology", value: "SI, 4 Stroke, Oil Cooled, Fuel Injection" },
                { label: "Engine Capacity", value: "200 cc" },
                { label: "Maximum Power", value: "20.5 bhp @ 9000 rpm" },
                { label: "Maximum Torque", value: "17.25 Nm @ 7250 rpm" },
                { label: "Transmission", value: "5-Speed Gearbox" },
                { label: "Clutch", value: "Wet Type, Multi-Plate" },
                { label: "Cooling System", value: "Oil Cooled" },
                { label: "Fuel System", value: "Fuel Injection" },
                { label: "Compression Ratio", value: "10:1" },
                { label: "Bore × Stroke", value: "66 mm × 57.8 mm" }
            ]
        },
        {
            category: "Chassis, Suspension & Brakes",
            items: [
                { label: "Frame Type", value: "Double Cradle Split Synchro Stiff" },
                { label: "Front Suspension", value: "Telescopic Fork" },
                { label: "Rear Suspension", value: "Monoshock" },
                { label: "Front Tyre", value: "90/90-17 (Radial)" },
                { label: "Rear Tyre", value: "130/70-R17 (Radial)" },
                { label: "Wheel Type", value: "Alloy Wheels, Tubeless" },
                { label: "Brakes (Front)", value: "270 mm Disc" },
                { label: "Brakes (Rear)", value: "240 mm Disc" },
                { label: "ABS", value: "Dual Channel ABS" }
            ]
        },
        {
            category: "Dimensions & Capacity",
            items: [
                { label: "Length", value: "2050 mm" },
                { label: "Width", value: "790 mm" },
                { label: "Height", value: "1050 mm" },
                { label: "Wheelbase", value: "1353 mm" },
                { label: "Ground Clearance", value: "180 mm" },
                { label: "Seat Height", value: "800 mm" },
                { label: "Kerb Weight", value: "152 kg" },
                { label: "Fuel Tank Capacity", value: "12 L" },
                { label: "Maximum Speed", value: "127 kmph" }
            ]
        },
        {
            category: "Electricals & Features",
            items: [
                { label: "Headlamp", value: "LED with DRL" },
                { label: "Tail Lamp", value: "LED" },
                { label: "Battery", value: "12 V" },
                { label: "Console", value: "Speedometer LCD" },
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
             style="background-color: ${color.hex}; ${color.hex === '#f0f0f0' ? 'border: 2px solid #d1d5db;' : ''}" 
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
            <img src="assets/images/page_images/RTR2004V/${color.folder}/${img}" alt="TVS Apache RTR 200 4V ${color.name}">
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
