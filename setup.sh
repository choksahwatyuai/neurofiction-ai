#!/bin/bash

# Elite Security Research Team - Website Setup Script
# This script sets up the development environment for the website

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${YELLOW}[*]${NC} $1"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}[+]${NC} $1"
}

# Function to print error messages
print_error() {
    echo -e "${RED}[!]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
    print_error "This script should not be run as root. Please run as a normal user."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    echo "You can download it from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p assets/{icons,images,screenshots}
mkdir -p css
mkdir -p js

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install --save-dev http-server workbox-cli

# Make scripts executable
print_status "Setting up scripts..."
chmod +x generate-icons.js

# Create a simple development server script
cat > server.js << 'EOL'
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);
    
    // Handle root URL
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Default content type
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Page not found
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content || '404 Not Found', 'utf-8');
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
EOL

# Create a simple 404 page
cat > 404.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
        }
        h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: #4f46e5;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            color: #6b7280;
        }
        a {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.3s ease;
        }
        a:hover {
            background: #4338ca;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background: #111827;
                color: #f9fafb;
            }
            p {
                color: #d1d5db;
            }
        }
    </style>
</head>
<body>
    <h1>404</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <a href="/">Go to Homepage</a>
</body>
</html>
EOL

# Create a simple README.md if it doesn't exist
if [ ! -f README.md ]; then
    cat > README.md << 'EOL'
# Elite Security Research Team Website

Welcome to the Elite Security Research Team website repository. This website showcases our work, research, and contact information.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/elite-security-website.git
   cd elite-security-website
   ```

2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

### Development

To start the development server:

```bash
node server.js
```

Then open your browser and navigate to `http://localhost:8000`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
EOL
fi

# Create a simple LICENSE file if it doesn't exist
if [ ! -f LICENSE ]; then
    cat > LICENSE << 'EOL'
MIT License

Copyright (c) 2023 Elite Security Research Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOL
fi

# Create a .env file if it doesn't exist
if [ ! -f .env ]; then
    cat > .env << 'EOL'
# Environment Variables
NODE_ENV=development
PORT=8000

# API Endpoints (if any)
# API_URL=https://api.example.com
# API_KEY=your_api_key_here

# Analytics (if any)
# GA_TRACKING_ID=UA-XXXXXXXXX-X

# Other configuration
# SITE_NAME="Elite Security Research Team"
EOL
fi

print_success "Setup completed successfully!"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Add your source icon (1024x1024 PNG recommended) to generate PWA icons"
echo "2. Run: node generate-icons.js /path/to/your/icon.png"
echo "3. Start the development server: node server.js"
echo -e "\n${GREEN}Happy coding!${NC}"
