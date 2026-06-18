// Generates a few example "photo" PNGs into src/assets/photos/ so you can try
// the photo-library feature without supplying your own images. Safe to delete
// the generated sample-*.png files anytime. Run with: npm run samples
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'photos');
mkdirSync(OUT, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function png(w, h, px) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit, truecolor RGB
  const raw = Buffer.alloc((w * 3 + 1) * h);
  let o = 0;
  for (let y = 0; y < h; y++) {
    raw[o++] = 0;
    for (let x = 0; x < w; x++) {
      const [r, g, b] = px(x / w, y / h);
      raw[o++] = r & 255; raw[o++] = g & 255; raw[o++] = b & 255;
    }
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

// HSV -> RGB
function hsv(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const [r, g, b] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
  return [r * 255, g * 255, b * 255];
}

const scenes = [
  { name: 'sample-sunset', hue: 0.04, hue2: 0.92 },
  { name: 'sample-ocean', hue: 0.55, hue2: 0.66 },
  { name: 'sample-forest', hue: 0.33, hue2: 0.18 },
  { name: 'sample-violet', hue: 0.74, hue2: 0.58 },
  { name: 'sample-amber', hue: 0.11, hue2: 0.03 },
];

const W = 1200, H = 800;
for (const s of scenes) {
  const cx = 0.5 + (Math.random() - 0.5) * 0.5;
  const cy = 0.3 + Math.random() * 0.3;
  const buf = png(W, H, (x, y) => {
    const grad = (x * 0.6 + y * 0.4);
    const h = s.hue + (s.hue2 - s.hue) * grad;
    // soft radial light to feel less flat / more photographic
    const dx = x - cx, dy = y - cy;
    const light = Math.max(0, 0.55 - Math.sqrt(dx * dx + dy * dy) * 0.6);
    const v = Math.min(1, 0.42 + grad * 0.32 + light);
    const sat = Math.max(0.25, 0.7 - light * 0.4);
    return hsv((h % 1 + 1) % 1, sat, v);
  });
  writeFileSync(join(OUT, `${s.name}.png`), buf);
  console.log(`wrote ${s.name}.png`);
}
console.log(`\nDone. ${scenes.length} sample photos written to src/assets/photos/`);
