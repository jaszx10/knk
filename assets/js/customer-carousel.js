const customerImages = [
    "WhatsApp Image 2026-04-16 at 9.31.55 PM.jpeg",
    "WhatsApp Image 2026-04-16 at 9.32.14 PM.jpeg",
    "WhatsApp Image 2026-04-16 at 9.32.37 PM.jpeg",
    "WhatsApp Image 2026-04-16 at 9.33.38 PM.jpeg",
    "WhatsApp Image 2026-04-16 at 9.38.14 PM.jpeg",
    "WhatsApp Image 2026-04-16 at 9.39.00 PM.jpeg",
    "WhatsApp Image 2026-04-16 at 9.39.30 PM.jpeg"
];

let globalCarouselIndex = 0;
const SLIDE_DURATION_MS = 3000;

document.addEventListener("DOMContentLoaded", () => {
    // There may be multiple containers on the same page (unlikely, but robust) 
    // or just one. We sync them all to the same index.
    const containers = document.querySelectorAll(".trusted-carousel-engine");
    
    if(containers.length === 0) return;

    // Build the DOM structure
    containers.forEach(container => {
        container.innerHTML = "";
        customerImages.forEach((src, idx) => {
            const el = document.createElement('div');
            el.className = 'trusted-carousel-item';
            el.dataset.index = idx;
            
            const img = document.createElement('img');
            // Make sure URI params handle spaces automatically in the browser
            img.src = `assets/images/CustomerImg/${src}`;
            img.loading = "lazy";
            img.alt = "Trusted by people of Kanchipuram - KNK TVS customer";
            
            el.appendChild(img);
            container.appendChild(el);
        });
        
        // Setup initial state
        updateCarousel(container, globalCarouselIndex);
    });
    
    // Auto run loop
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            globalCarouselIndex = (globalCarouselIndex + 1) % customerImages.length;
            containers.forEach(container => {
                updateCarousel(container, globalCarouselIndex);
            });
        }
    }, SLIDE_DURATION_MS);
});

function updateCarousel(container, centerIndex) {
    const items = container.querySelectorAll('.trusted-carousel-item');
    const total = items.length;
    
    const left1 = (centerIndex - 1 + total) % total;
    const left2 = (centerIndex - 2 + total) % total;
    const right1 = (centerIndex + 1) % total;
    const right2 = (centerIndex + 2) % total;
    
    items.forEach((item, idx) => {
        // Quick trick to force transition reset for z-index
        item.style.zIndex = 1;
        item.classList.remove('center', 'left1', 'left2', 'right1', 'right2');
        
        if (idx === centerIndex) {
            item.style.zIndex = 10;
            item.classList.add('center');
        } else if (idx === left1) {
            item.style.zIndex = 5;
            item.classList.add('left1');
        } else if (idx === left2) {
            item.style.zIndex = 3;
            item.classList.add('left2');
        } else if (idx === right1) {
            item.style.zIndex = 5;
            item.classList.add('right1');
        } else if (idx === right2) {
            item.style.zIndex = 3;
            item.classList.add('right2');
        }
    });
}
