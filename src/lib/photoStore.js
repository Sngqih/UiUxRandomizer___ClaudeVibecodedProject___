// Photo library backing store. Two sources are merged:
//   1. Folder photos — image files dropped into src/assets/photos/, discovered
//      at build/dev time via import.meta.glob (read-only, version-controllable).
//   2. Uploaded photos — added through the UI at runtime, persisted as Blobs in
//      IndexedDB so they survive reloads.

const DB_NAME = 'theme-randomizer';
const STORE = 'photos';
const IMG_GLOB = '../assets/photos/*.{jpg,jpeg,png,webp,avif,gif,svg}';

// --- Folder source (static) ---
export function folderPhotos() {
  const mods = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif,gif,svg}', {
    eager: true,
    query: '?url',
    import: 'default',
  });
  return Object.entries(mods)
    .map(([path, url]) => ({ id: `folder:${path}`, url, name: path.split('/').pop(), source: 'folder' }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// --- Uploaded source (IndexedDB) ---
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx(db, mode) {
  return db.transaction(STORE, mode).objectStore(STORE);
}

export async function getUploadedPhotos() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = tx(db, 'readonly').getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export async function addUploadedPhotos(files) {
  const db = await openDB();
  const records = files.map((file) => ({
    id: `upload:${Date.now()}:${Math.random().toString(36).slice(2, 9)}`,
    blob: file,
    name: file.name || 'photo',
    addedAt: Date.now(),
  }));
  await new Promise((resolve, reject) => {
    const store = tx(db, 'readwrite');
    records.forEach((r) => store.put(r));
    store.transaction.oncomplete = () => resolve();
    store.transaction.onerror = () => reject(store.transaction.error);
  });
  return records;
}

export async function deleteUploadedPhoto(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = tx(db, 'readwrite');
    store.delete(id);
    store.transaction.oncomplete = () => resolve();
    store.transaction.onerror = () => reject(store.transaction.error);
  });
}

export async function clearUploadedPhotos() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = tx(db, 'readwrite');
    store.clear();
    store.transaction.oncomplete = () => resolve();
    store.transaction.onerror = () => reject(store.transaction.error);
  });
}

export const SUPPORTED_GLOB = IMG_GLOB;
