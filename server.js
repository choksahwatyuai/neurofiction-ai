const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = path.join(__dirname, 'src');

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.webmanifest': 'application/manifest+json',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Parse URL
    let url = req.url.split('?')[0]; // Remove query string
    
    // Default to index.html for root and any non-file requests
    if (url === '/' || url === '') {
        url = '/index.html';
    } else if (!path.extname(url)) {
        // If no extension, assume it's a SPA route and serve index.html
        url = '/index.html';
    }
    
    // Construct file path
    let filePath = path.join(BASE_DIR, url);
    
    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Get content type from MIME types or default to octet-stream
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Page not found - serve index.html for SPA routing
                fs.readFile(path.join(BASE_DIR, 'index.html'), (error, content) => {
                    if (error) {
                        // If we can't serve index.html, return 404
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 Not Found', 'utf-8');
                        return;
                    }
                    
                    // Serve index.html with 200 OK for SPA routing
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});
