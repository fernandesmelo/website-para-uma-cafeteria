const CACHE_NAME = "manhattan-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/style-mobile.css",
  "./assets/logo.png",
  "./assets/parallax-imagem1.png",
  "./assets/parallax-imagem2.jpg",
  "./assets/parallax-imagem3.jpg",
  "./assets/parallax-imagem4.png",
  "./assets/parallax-imagem5.jpg",
  "./assets/seta-para-cima.png",
  "./js/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});