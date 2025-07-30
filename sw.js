/**
 * Service Worker for Elite Security Research Team
 * Provides offline functionality and asset caching
 */

const CACHE_NAME = 'elite-security-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/language-switcher.css',
  '/css/header.css',
  '/js/main.js',
  '/js/language-switcher.js',
  '/js/mobile-menu.js',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  // Add other assets as needed
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell and content');
        return cache.addAll(CACHE_ASSETS);
      })
  );
  
  // Activate the new service worker immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  
  // Take control of all clients
  event.waitUntil(clients.claim());
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // For non-GET requests, use network only
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For HTML requests, try the network first, then cache
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response for caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request)
            .then((response) => {
              // If not found in cache, show offline page
              if (!response) {
                return caches.match(OFFLINE_URL);
              }
              return response;
            });
        })
    );
    return;
  }
  
  // For other resources, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise, fetch from network and cache the response
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response for caching
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
  );
});

// Listen for messages from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
