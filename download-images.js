const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Image URLs (using placeholder images for demonstration)
const images = {
    'college-building.jpg': 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80',
    'ba-program.jpg': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    'bcom-program.jpg': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    'bsc-program.jpg': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    'ma-program.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'
};

// Download images
Object.entries(images).forEach(([filename, url]) => {
    const filepath = path.join(imagesDir, filename);
    https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
            console.log(`Downloaded: ${filename}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${filename}:`, err.message);
    });
}); 