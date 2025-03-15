const CACHE_NAME = 'ghibli-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  './css/style.css',
  './css/mobile.css',
  '/script.js',
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
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
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