
// Service Worker desactivado para mayor compatibilidad
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
