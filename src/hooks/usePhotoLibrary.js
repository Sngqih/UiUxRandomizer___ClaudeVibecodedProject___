import { useCallback, useEffect, useRef, useState } from 'react';
import {
  folderPhotos, getUploadedPhotos, addUploadedPhotos, deleteUploadedPhoto, clearUploadedPhotos,
} from '../lib/photoStore.js';

// Merges folder photos (static) with uploaded photos (IndexedDB) into a single
// reactive library, and exposes add/remove/clear actions.
export function usePhotoLibrary() {
  const folder = useRef(folderPhotos()).current;
  const [uploads, setUploads] = useState([]);
  const objectUrls = useRef(new Map());

  const refresh = useCallback(async () => {
    let records = [];
    try {
      records = await getUploadedPhotos();
    } catch {
      records = [];
    }
    const list = records
      .sort((a, b) => a.addedAt - b.addedAt)
      .map((r) => {
        let url = objectUrls.current.get(r.id);
        if (!url) {
          url = URL.createObjectURL(r.blob);
          objectUrls.current.set(r.id, url);
        }
        return { id: r.id, url, name: r.name, source: 'upload' };
      });
    setUploads(list);
  }, []);

  useEffect(() => {
    refresh();
    const urls = objectUrls.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls.clear();
    };
  }, [refresh]);

  const add = useCallback(
    async (fileList) => {
      const files = [...fileList].filter((f) => f.type?.startsWith('image/'));
      if (!files.length) return [];
      const records = await addUploadedPhotos(files);
      await refresh();
      return records;
    },
    [refresh],
  );

  const remove = useCallback(
    async (id) => {
      const url = objectUrls.current.get(id);
      if (url) {
        URL.revokeObjectURL(url);
        objectUrls.current.delete(id);
      }
      await deleteUploadedPhoto(id);
      await refresh();
    },
    [refresh],
  );

  const clear = useCallback(async () => {
    objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
    objectUrls.current.clear();
    await clearUploadedPhotos();
    await refresh();
  }, [refresh]);

  return {
    photos: [...folder, ...uploads],
    folderCount: folder.length,
    uploadCount: uploads.length,
    add,
    remove,
    clear,
  };
}
