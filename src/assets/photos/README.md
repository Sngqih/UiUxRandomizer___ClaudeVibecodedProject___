# Your photo library

Drop image files here (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`)
and they're auto-discovered by the randomizer's **Images** panel — no code changes
needed. Restart the dev server if a newly added file doesn't show up immediately.

You can also add photos at runtime from the app itself (drag-drop / file picker);
those are stored in your browser (IndexedDB) and merged with whatever is in this
folder.

To drop in a few example images to try the feature:

```bash
npm run samples
```

That writes a handful of `sample-*.png` files here. Delete them anytime — this
folder is meant for your own photos.
