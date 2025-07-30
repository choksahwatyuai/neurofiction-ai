#!/usr/bin/env node

/**
 * Generate PWA Icons Script
 * 
 * This script generates all necessary icon sizes for PWA from a source icon.
 * Requires ImageMagick to be installed on the system.
 * 
 * Usage: node generate-icons.js /path/to/source/icon.png
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define the output directory for icons
const outputDir = path.join(__dirname, 'assets', 'icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Icon sizes for different devices and platforms
const iconSizes = [
  { size: '16x16', name: 'icon-16x16.png' },
  { size: '32x32', name: 'icon-32x32.png' },
  { size: '48x48', name: 'icon-48x48.png' },
  { size: '72x72', name: 'icon-72x72.png' },
  { size: '96x96', name: 'icon-96x96.png' },
  { size: '128x128', name: 'icon-128x128.png' },
  { size: '144x144', name: 'icon-144x144.png' },
  { size: '152x152', name: 'icon-152x152.png' },
  { size: '192x192', name: 'icon-192x192.png' },
  { size: '256x256', name: 'icon-256x256.png' },
  { size: '384x384', name: 'icon-384x384.png' },
  { size: '512x512', name: 'icon-512x512.png' },
  { size: '1024x1024', name: 'icon-1024x1024.png' },
];

// Check if ImageMagick is installed
function checkImageMagick() {
  try {
    execSync('convert -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Generate icons
function generateIcons(sourceImage) {
  if (!fs.existsSync(sourceImage)) {
    console.error(`Error: Source image '${sourceImage}' not found.`);
    process.exit(1);
  }

  console.log(`Generating icons from: ${sourceImage}`);
  
  iconSizes.forEach(icon => {
    const outputPath = path.join(outputDir, icon.name);
    
    try {
      execSync(`convert "${sourceImage}" -resize ${icon.size} -background none -gravity center -extent ${icon.size} "${outputPath}"`);
      console.log(`✓ Generated ${icon.name} (${icon.size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${icon.name}: ${error.message}`);
    }
  });
  
  console.log('\nIcons generated successfully!');
  console.log(`Location: ${outputDir}`);
}

// Main function
function main() {
  // Check for source image path
  const sourceImage = process.argv[2];
  
  if (!sourceImage) {
    console.log('Usage: node generate-icons.js /path/to/source/icon.png');
    process.exit(1);
  }
  
  // Check if ImageMagick is installed
  if (!checkImageMagick()) {
    console.error('Error: ImageMagick is required but not installed.');
    console.error('Please install ImageMagick first: https://imagemagick.org/script/download.php');
    process.exit(1);
  }
  
  // Generate icons
  generateIcons(sourceImage);
}

// Run the script
main();
