# Theme Randomizer

Generate complete UI designs at random — layout/structure, background, color
scheme, font pairing, and icon set — then preview them live and export the result.

**▶ Try it in your browser, nothing to install:
<https://sngqih.github.io/UiUxRandomizer___ClaudeVibecodedProject___/>**

Want to run or change it yourself? See [Run it](#run-it).

## Features

- **Layout engine** — every roll produces a structurally different design, not just
  a recolor:
  - **Page archetypes** (selectable, or "Surprise me"): **Landing**, **Dashboard**,
    **Portfolio**, **Editorial**, **App screen**, and **Poster / infographic**. Each
    renders in its own shell — vertical *stack*, *sidebar* app, *phone* frame, or a
    centered *poster* canvas.
  - **Heavy reflow** within an archetype: hero variant (centered / split / image-bg /
    minimal / stacked / overlap / editorial / full-bleed cover), section order is
    shuffled, grid layouts (cols / bento / masonry / feature), nav style, card treatment
    (bordered / elevated / filled / flat), density, alignment, and where visuals are placed.
  - **Editorial / awwwards-style creative** — a photo-forward archetype with an
    asymmetric **photo bento** (tagged cells), full-bleed **cover hero** with a rotated
    sticker, a horizontal **image marquee**, a numbered **index list** with thumbnails,
    and **statement + photo** blocks. A subtle **grain** texture and display-leaning
    typography complete the look. Every image area is drag-drop + focal enabled.
  - **Editorial sections** for extra range: scrolling **marquee**, oversized **big
    statement**, **logo strip**, and numbered **process steps**.
  - **Poster / infographic** pages get their own blocks: oversized **figures**, labeled
    **charts**, a proportion **breakdown** bar, bold **callouts**, and big display headers.
  - **Themed abstract visuals** generated from the palette (gradient, mesh, blob,
    geometric shapes, rings, waves) plus charts (bars / area / donut). Fully offline,
    always on-brand. Seeded so they stay stable until you re-roll.
- **Expressive typography** — 50+ curated Google Font pairings spanning clean,
  editorial, display, condensed, slab, magazine, and experimental faces, plus randomized
  **treatments** (uppercase / mixed case, letter-spacing) biased toward each face's
  character for more creative range.
- **Real photos (your own library)** — use real images as an optional source so the
  output looks like an actual product, via the **Images** control (Visuals / Photos /
  Mix):
  - **Two ways to add photos**, merged into one library: drop files into
    `src/assets/photos/` (auto-discovered), and/or upload in the app (drag-drop or file
    picker — stored in your browser via IndexedDB, so they persist across reloads).
  - **Mix** scatters photos and generated visuals across the page; **Photos** uses
    them everywhere; charts always stay abstract.
  - **Drag-and-drop onto any area** — drag an image straight onto an image area in
    the preview to replace just that spot. Works with files from your computer (saved
    to your library automatically) and with the library thumbnails in the rail. The
    override wins over the current mode, so you can hand-place a single image while
    everything else stays generated. Re-rolling the layout clears the placements
    (lock **Layout & structure** to keep them).
  - **Reframe in place** — grab any placed photo and drag to pan how it's cropped
    (`object-position`, with proper cover-overflow math so it feels like moving the
    photo). Double-click to re-center. Replacing the image or re-rolling the layout
    resets framing.
  - Optional **tint** toggle overlays a subtle palette duotone so photos stay
    color-cohesive. Photos are shown natural by default.
  - No photos yet? Run `npm run samples` to drop a few example images into the folder.
- **Two color modes**
  - **Harmonious** — color-theory driven (monochromatic, analogous, complementary,
    split-complementary, triadic, tetradic). Always balanced and readable; contrast
    against text is enforced to WCAG-ish targets.
  - **Style preset** — randomize within a chosen vibe: Minimal, Neon, Pastel, Retro,
    Brutalist, Earthy, Corporate, Vaporwave, Playful, Dark Pro.
- **Also generates**: page background (solid / linear / radial / mesh gradient /
  dot grid / line grid), a 15-color scheme, a Google Font pairing (heading + body),
  corner radius, and a Lucide icon set with a randomized stroke width.
- **Live preview** — a full sample interface rendered with the generated theme and
  layout so you can judge it in context.
- **Locks** — keep any section (layout & structure, colors & shape, background,
  typography, icons) fixed while you re-roll the rest. E.g. lock the layout and
  re-roll only the palette, or lock colors and shuffle the structure.
- **Export**
  - Click any color swatch to copy its hex code.
  - Copy the heading/body font names, background CSS value, etc.
  - Copy the full theme as **JSON design tokens**, or download it as a `.json` file.
- **Keyboard**: press <kbd>Space</kbd> to generate a new theme.

## Run it

You need [Node.js](https://nodejs.org) (the LTS version). Get the code with
**Code → Download ZIP** on GitHub, or `git clone` it.

**Windows, the easy way:** double-click **`Start Theme Randomizer.bat`**. The first
time it installs the packages (about 10 seconds), then your browser opens the app.
Close the black window to stop it.

**Any system, from a terminal** in the project folder:

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run samples  # (optional) drop example photos into src/assets/photos/
npm run fonts    # (optional) re-download the self-hosted fonts
```

Fonts are **self-hosted** (`src/assets/fonts/`) so the app works fully offline —
no Google Fonts / CDN dependency at runtime.

## Deploy & sharing

This is a fully static, client-side app — no server or database — so it can be
hosted for free anywhere. The build path is relative (`base: './'`), so the `dist/`
output works at a domain root *or* under a sub-path.

- **GitHub Pages** — push to GitHub, then Settings → Pages → Source: **GitHub
  Actions**. The included [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
  builds and publishes on every push to `main`.
- **Vercel** — "Import" the repo; it auto-detects Vite (build `npm run build`,
  output `dist`). No config needed.
- **Netlify** — "Add new site → Import"; [`netlify.toml`](netlify.toml) sets the
  build for you.
- **Any static host / S3 / nginx** — run `npm run build` and upload `dist/`.

**How other people use it:**
- **End users** just open the deployed link — nothing to install or clone.
- **Developers** who want to run or modify it: `git clone …` → `npm install` →
  `npm run dev`.
- Note: you can't simply double-click `dist/index.html` (ES modules need to be
  served over http). Use a host, or `npm run preview` locally.

Uploaded photos live in the visitor's own browser (IndexedDB); folder photos in
`src/assets/photos/` ship with the build.

## How it's organized

```
src/
  lib/
    color.js        # HSL/HEX conversion, WCAG contrast, mix/alpha helpers
    util.js         # random/array helpers
    fonts.js        # curated Google Font pairings (tagged by vibe)
    icons.js        # curated Lucide icon pool
    presets.js      # the harmonious spec + 10 style presets
    layout.js       # page archetypes + the structural reflow composer
    generator.js    # builds a full theme (colors + layout) from a spec
    tokens.js       # theme -> JSON tokens and CSS variables
    photoStore.js   # photo library: folder glob + IndexedDB uploads
  hooks/
    useGoogleFonts.js  # loads the current theme's fonts from Google Fonts
    useCopy.js         # copy-to-clipboard with "copied" feedback
    usePhotoLibrary.js # merges folder + uploaded photos into one reactive list
  components/
    Controls.jsx    # left rail: page type, color mode, presets, generate, locks
    ImageControls.jsx  # rail: image source (Visuals/Photos/Mix), tint, uploader
    Preview.jsx     # center: renders the layout (stack / sidebar / phone shells)
    Visual.jsx      # themed abstract visuals + charts from the palette
    Picture.jsx     # per-slot chooser (photo/visual) + drag-drop replace target
    Inspector.jsx   # right: swatches, layout summary, token export
    blocks/
      Block.jsx     # dispatcher + every section/nav/hero renderer
      parts.jsx     # shared block helpers + filler content
  assets/photos/    # drop your own images here (auto-discovered)
  App.jsx           # state + wiring
scripts/
  gen-sample-photos.mjs  # `npm run samples` — writes example images to assets/photos
```

## Exported token shape

```json
{
  "$schema": "theme-randomizer/v1",
  "name": "Wild Prism",
  "appearance": "dark",
  "archetype": "landing",
  "color": { "primary": "#...", "secondary": "#...", "...": "..." },
  "background": { "type": "linear", "value": "linear-gradient(...)" },
  "typography": {
    "heading": { "fontFamily": "'Syne', sans-serif", "weights": ["600", "800"] },
    "body": { "fontFamily": "'Inter', sans-serif", "weights": ["400", "500"] },
    "googleFontsUrl": "https://fonts.googleapis.com/css2?..."
  },
  "radius": "12px",
  "icons": { "library": "lucide", "strokeWidth": 1.75, "sample": ["Home", "..."] },
  "layout": {
    "archetype": "landing",
    "shell": "stack",
    "density": "comfortable",
    "align": "left",
    "cardStyle": "elevated",
    "accent": "bold",
    "blocks": [
      { "type": "nav", "variant": "bar-cta" },
      { "type": "hero", "variant": "split-right" },
      { "type": "features", "variant": "cols-3" },
      { "type": "cta", "variant": "banner" },
      { "type": "footer", "variant": "columns" }
    ]
  }
}
```
