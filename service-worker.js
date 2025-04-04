const CACHE_NAME = 'ghibli-cache-v1';
const urlsToCache = [
  './',
  '/index.html',
  './css/style.css',
  './css/style-mobile.css',
  '/manifest.json',
  './assets/logo.ico',
  './assets/logo.png',
  './assets/parallax/imagem1.png',
  './assets/parallax/imagem2.jpg',
  './assets/parallax/imagem3.jpg',
  './assets/parallax/imagem4.png',
  './assets/parallax/imagem5.jpg',
  './assets/seta-para-cima.png',
  './assets/icons/android/android-launchericon-48-48.png',
  './assets/icons/android/android-launchericon-72-72.png',
  './assets/icons/android/android-launchericon-96-96.png',
  './assets/icons/android/android-launchericon-144-144.png', 
  './assets/icons/android/android-launchericon-192-192.png',
  './assets/icons/android/android-launchericon-512-512.png',
  './assets/icons/ios/256.png',
];

// Instalando o Service Worker e armazenando em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições para servir conteúdo do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Atualizando o cache quando o Service Worker é ativado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});