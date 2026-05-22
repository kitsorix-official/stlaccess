const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Fix the root url to have a trailing slash:
            content = content.replace(/"url":\s*"https:\/\/stlaccess\.com"/g, '"url": "https://stlaccess.com/"');
            content = content.replace(/"item":\s*"https:\/\/stlaccess\.com"/g, '"item": "https://stlaccess.com/"');
            content = content.replace(/"@id":\s*"https:\/\/stlaccess\.com"/g, '"@id": "https://stlaccess.com/"');
            content = content.replace(/"url":\s*"https:\/\/stlaccess\.com",/g, '"url": "https://stlaccess.com/",');

            // Fix non-root urls to not have a trailing slash:
            // e.g. "https://stlaccess.com/reference/" -> "https://stlaccess.com/reference"
            // We use regex to match "https://stlaccess.com/SOMETHING/"
            content = content.replace(/https:\/\/stlaccess\.com\/([a-zA-Z0-9_\-]+)\//g, 'https://stlaccess.com/$1');
            
            // Also handle hash fragments like "https://stlaccess.com/reference/#webpage" -> "https://stlaccess.com/reference#webpage"
            content = content.replace(/https:\/\/stlaccess\.com\/([a-zA-Z0-9_\-]+)\/#/g, 'https://stlaccess.com/$1#');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed', fullPath);
            }
        }
    }
}

processDir('./src/pages');
