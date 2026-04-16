/**
 * TVS Ronin Product Details Logic
 */

const roninData = {
    colors: [
        { 
            name: "Nimbus Grey", 
            hex: "#8e9092", 
            folder: "Nimbus_Grey",
            images: [
                "-original-imahfvsdzyqvwnn7.webp", // Hero
                "-original-imahfvsdakhkarvu.webp", // 3/4
                "-original-imahfvsdtsu2sqba.webp", // Right
                "-original-imahfvsd6hpqz73h.webp", // Left
                "-original-imahfvsdhphhqz2k.webp", // Front
                "-original-imahfvsdya2rvazw.webp"  // Rear
            ]
        },
        { 
            name: "Charcoal Ember", 
            hex: "#1e1e1e", 
            folder: "Charcoal_Ember",
            images: [
                "-original-imahfvsdftrgdyuw.webp",
                "-original-imahfvsdngzyykqz.webp",
                "-original-imahfvsdgd67hvxz.webp",
                "-original-imahfvsdhfvrfpdr.webp",
                "-original-imahfvsdr3reajtd.webp",
                "-original-imahfvsdaxqrduxr.webp"
            ]
        },
        { 
            name: "Glacier Silver", 
            hex: "#d1d5db", 
            folder: "Glacier_Silver",
            images: [
                "-original-imahfvsdjqa9azxh.webp",
                "-original-imahfvsdh4py3dfm.webp",
                "-original-imahfvsdrqsnwmuz.webp",
                "-original-imahfvsdedzyh6vn.webp",
                "-original-imahfvsd7yg7hd3e.webp",
                "-original-imahfvsdtfkacjhw.webp"
            ]
        },
        { 
            name: "Lightning Black", 
            hex: "#000000", 
            folder: "Lightning_Black",
            images: [
                "-original-imahfvsdgfsunvsp.webp",
                "-original-imahfvsdge8ufygv.webp",
                "-original-imahfvsdpzzfbtpu.webp",
                "-original-imahfvsdtkywyu9g.webp",
                "-original-imahfvsdz3zumenh.webp",
                "-original-imahfvsecmyzrdeg.webp"
            ]
        },
        { 
            name: "Magma Red", 
            hex: "#bb0013", 
            folder: "Magma_Red",
            images: [
                "-original-imahfvsdpwhmhsxp.webp",
                "-original-imahfvsdmp36xzgh.webp",
                "-original-imahfvsdmu6hmaha.webp",
                "-original-imahfvsdgc5wnbbg.webp",
                "-original-imahfvsdwfczduk9.webp",
                "-original-imahfvsdyxyhd9jz.webp"
            ]
        },
        { 
            name: "Midnight Blue", 
            hex: "#1e3a8a", 
            folder: "Midnight_Blue",
            images: [
                "-original-imahfvsds5jyp9ah.webp",
                "-original-imahfvsdaa5x7fdp.webp",
                "-original-imahfvsd3wzwmnxh.webp",
                "-original-imahfvsdc6vfqzgg.webp",
                "-original-imahfvsdg7ynznr3.webp",
                "-original-imahfvsdgtyvgtkr.webp"
            ]
        }
    ],
    specs: [
        {
            category: "Engine & Transmission",
            items: [
                { label: "Engine Type", value: "Single Cylinder, 4 Stroke, 4 Valve, DOHC" },
                { label: "Engine Capacity", value: "225.9 cc" },
                { label: "Maximum Power", value: "15.01 kW (20.4 PS) @ 7750 rpm" },
                { label: "Maximum Torque", value: "19.93 Nm @ 3750 rpm" },
                { label: "Transmission", value: "5-speed Gearbox" },
                { label: "Clutch", value: "Assist & Slipper Clutch" },
                { label: "Cooling System", value: "Oil Cooled" },
                { label: "Fuel System", value: "Fuel Injection" }
            ]
        },
        {
            category: "Chassis, Suspension & Brakes",
            items: [
                { label: "Frame Type", value: "Double Cradle Split Synchro Stiff Frame" },
                { label: "Front Suspension", value: "Upside Down Fork (USD)" },
                { label: "Rear Suspension", value: "Monoshock" },
                { label: "Brakes (Front)", value: "300 mm Disc" },
                { label: "Brakes (Rear)", value: "240 mm Disc" },
                { label: "ABS Type", value: "Dual Channel ABS" },
                { label: "Wheels", value: "9 Spoke Alloy" }
            ]
        },
        {
            category: "Dimensions & Fuel Tank",
            items: [
                { label: "Length x Width x Height", value: "2040 x 805 x 1170 mm" },
                { label: "Wheelbase", value: "1357 mm" },
                { label: "Ground Clearance", value: "181 mm" },
                { label: "Seat Height", value: "795 mm" },
                { label: "Kerb Weight", value: "159 kg" },
                { label: "Fuel Tank Capacity", value: "14 L" }
            ]
        },
        {
            category: "Electricals & Features",
            items: [
                { label: "Headlamp", value: "AHO, LED with T-Shaped DRL" },
                { label: "Tail Lamp / Indicators", value: "LED" },
                { label: "Console", value: "Fully Digital with SmartXonnect" },
                { label: "Connectivity", value: "Bluetooth, Voice Assist, Navigation" },
                { label: "Ride Modes", value: "Rain & Urban Mode" }
            ]
        }
    ]
};

let currentState = {
    colorIndex: 0,
    slideIndex: 0
};

// Initialize the page
function initProductPage() {
    renderColorSelector();
    renderSpecs();
    updateGallery();
}

function renderColorSelector() {
    const container = document.getElementById('colorSelector');
    container.innerHTML = roninData.colors.map((color, index) => `
        <div class="color-swatch ${index === 0 ? 'active' : ''}" 
             style="background-color: ${color.hex}" 
             onclick="selectColor(${index})"
             title="${color.name}">
        </div>
    `).join('');
}

function selectColor(index) {
    currentState.colorIndex = index;
    currentState.slideIndex = 0; // Reset gallery to first image of new color
    
    // UI Updates
    document.querySelectorAll('.color-swatch').forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    document.getElementById('selectedColorName').innerText = roninData.colors[index].name;
    
    updateGallery();
}

function renderSpecs() {
    const container = document.getElementById('specsGrid');
    container.innerHTML = roninData.specs.map(cat => `
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
    const color = roninData.colors[currentState.colorIndex];
    const track = document.getElementById('productCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    
    track.innerHTML = color.images.map(img => `
        <div class="product-carousel-slide">
            <img src="assets/images/page_images/Ronin/${color.folder}/${img}" alt="TVS Ronin ${color.name}">
        </div>
    `).join('');
    
    dotsContainer.innerHTML = color.images.map((_, i) => `
        <div class="w-2 h-2 rounded-full bg-slate-200 transition-all ${i === 0 ? 'w-6 bg-primary' : ''}"></div>
    `).join('');
    
    currentState.slideIndex = 0;
    track.style.transform = `translateX(0)`;
}

function nextSlide() {
    const color = roninData.colors[currentState.colorIndex];
    if (currentState.slideIndex < color.images.length - 1) {
        currentState.slideIndex++;
        applySlide();
    } else {
        currentState.slideIndex = 0;
        applySlide();
    }
}

function prevSlide() {
    const color = roninData.colors[currentState.colorIndex];
    if (currentState.slideIndex > 0) {
        currentState.slideIndex--;
        applySlide();
    } else {
        currentState.slideIndex = color.images.length - 1;
        applySlide();
    }
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
