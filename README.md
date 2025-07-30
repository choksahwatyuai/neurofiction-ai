# Elite Security Research Team Website

A modern, responsive, and performant website for the Elite Security Research Team, featuring multi-language support (Korean, Russian, English) and PWA capabilities.

## Features

- 🌐 **Multi-language Support**: Seamless switching between Korean, Russian, and English
- 📱 **Fully Responsive**: Optimized for all device sizes
- ⚡ **Progressive Web App**: Installable and works offline
- 🚀 **Fast Performance**: Optimized assets and code splitting
- 🔍 **SEO Optimized**: Proper meta tags and semantic HTML
- 🎨 **Modern UI/UX**: Clean and professional design

## Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- CSS Variables for theming
- Service Workers for offline functionality
- Web App Manifest for PWA support
- Responsive Design with Mobile-First approach
- Accessibility (a11y) best practices

## Project Structure

```
.
├── index.html          # Main HTML file
├── offline.html        # Offline fallback page
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── css/               # Stylesheets
│   ├── header.css     # Header and navigation styles
│   └── language-switcher.css  # Language switcher styles
├── js/                # JavaScript files
│   ├── main.js        # Main application script
│   ├── language-switcher.js  # Language switching logic
│   └── mobile-menu.js # Mobile menu functionality
└── assets/            # Static assets (images, icons, etc.)
    └── icons/         # App icons for PWA
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development)
- npm or yarn (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/elite-security-website.git
   cd elite-security-website
   ```

2. Install dependencies (if any):
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx serve .
   # or with Python 3
   python -m http.server 8000
   ```

4. Open your browser and navigate to `http://localhost:8000`

## Building for Production

To create a production build (if using a build tool):

```bash
npm run build
# or
yarn build
```

## Adding New Languages

1. Add language files in the `locales/` directory
2. Update the language switcher component
3. Add translations for all UI elements

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [PWA Starter Kit](https://github.com/pwa-builder/pwa-starter) for PWA setup

## Contact

For any questions or feedback, please contact the development team.
