const fs = require('fs');
const path = require('path');

const configs = [
    { dir: 'RTR180', file: 'assets/js/rtr180-details.js' },
    { dir: 'RTR1604V', file: 'assets/js/rtr1604v-details.js' },
    { dir: 'RTR160', file: 'assets/js/rtr160-details.js' }
];

for (const config of configs) {
    const basePath = path.join('assets', 'images', 'page_images', config.dir);
    let jsContent = fs.readFileSync(config.file, 'utf8');

    // Find the colors array block
    const match = jsContent.match(/colors:\s*\[([\s\S]*?)\],\s*specs:/);
    if (!match) {
        console.log("Could not find colors in " + config.file);
        continue;
    }

    const colorsStr = match[1];

    // Evaluate the colors array
    const getColors = new Function(`return [${colorsStr}];`);
    let colors = getColors();

    // Update images for each color
    for (let c of colors) {
        const folderPath = path.join(basePath, c.folder);
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));

            // Sort naturally if files are numerical like 1.webp, 2.webp
            files.sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
                const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
                return numA - numB;
            });

            c.images = files;
        } else {
            console.log(`Folder not found: ${folderPath}`);
        }
    }

    // reconstruct the colors string
    const newColorsStr = colors.map(c => `        { name: "${c.name}", hex: "${c.hex}", folder: "${c.folder}", images: ${JSON.stringify(c.images)} }`).join(',\n');

    jsContent = jsContent.replace(/colors:\s*\[[\s\S]*?\],\s*specs:/, `colors: [\n${newColorsStr}\n    ],\n    specs:`);

    fs.writeFileSync(config.file, jsContent, 'utf8');
    console.log(`Updated images for ${config.file}`);
}
