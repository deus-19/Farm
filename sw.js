const C="farm-v4";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","manifest.json","icon.svg"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const u=e.request.url;
  if(e.request.method!=="GET"||!(u.startsWith(self.location.origin)||u.includes("gstatic.com")))return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();if(r.ok)caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
});
