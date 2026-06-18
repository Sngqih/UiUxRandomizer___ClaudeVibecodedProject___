import { useRef, useState } from 'react';
import { Move } from 'lucide-react';
import { buildVisual } from './Visual.jsx';
import { mulberry32 } from '../lib/util.js';
import { clamp } from '../lib/color.js';

// Custom drag type for dragging an existing library photo onto a slot.
export const PHOTO_DND_TYPE = 'text/x-tr-photo';

// Fills a decorative image slot. Doubles as:
//   • a drop target — drop an image (OS file or library thumbnail) to replace it.
//   • a focal-point editor — grab the photo and drag to pan how it's cropped
//     (object-position); double-click re-centers.
// Resolution order: per-slot override → mode-based photo pick → abstract visual.
export default function Picture({ ctx, seed, kind, className = '', label }) {
  const { theme, images } = ctx;
  const [dropping, setDropping] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const panRef = useRef(null);

  const photos = images?.photos ?? [];
  const overrides = images?.overrides ?? {};
  const focals = images?.focals ?? {};
  const mode = images?.mode ?? 'visuals';
  const canDrop = typeof images?.setOverride === 'function';
  const canFocal = typeof images?.setFocal === 'function';

  // Resolve which photo (if any) fills this slot.
  let photo = null;
  const overrideId = overrides[seed];
  if (overrideId) photo = photos.find((p) => p.id === overrideId) || null;
  if (!photo && photos.length) {
    let usePhoto = false;
    if (mode === 'photos') usePhoto = true;
    else if (mode === 'mix') usePhoto = mulberry32((seed >>> 0) + 1)() < 0.6;
    if (usePhoto) {
      const idx = Math.floor(mulberry32((seed >>> 0) + 101)() * photos.length) % photos.length;
      photo = photos[idx];
    }
  }

  // --- drop-to-replace ---
  const onDragOver = (e) => {
    if (!canDrop) return;
    const types = e.dataTransfer.types || [];
    if (types.includes('Files') || types.includes(PHOTO_DND_TYPE)) {
      e.preventDefault();
      if (!dropping) setDropping(true);
    }
  };
  const onDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDropping(false);
  };
  const onDrop = async (e) => {
    if (!canDrop) return;
    e.preventDefault();
    setDropping(false);
    const dt = e.dataTransfer;
    const file = [...(dt.files || [])].find((f) => f.type?.startsWith('image/'));
    if (file && images.addFiles) {
      const recs = await images.addFiles([file]);
      if (recs && recs[0]) images.setOverride(seed, recs[0].id);
      return;
    }
    const id = dt.getData(PHOTO_DND_TYPE);
    if (id) images.setOverride(seed, id);
  };

  // --- grab-to-reframe (focal point via object-position) ---
  const focal = focals[seed] || { x: 50, y: 50 };

  const onPointerDown = (e) => {
    if (!canFocal || e.button !== 0) return;
    const box = containerRef.current?.getBoundingClientRect();
    const img = imgRef.current;
    if (!box || !img || !img.naturalWidth) return;
    const scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
    const overflowX = img.naturalWidth * scale - box.width;
    const overflowY = img.naturalHeight * scale - box.height;
    if (overflowX < 1 && overflowY < 1) return; // nothing to pan
    panRef.current = { startX: e.clientX, startY: e.clientY, fx: focal.x, fy: focal.y, sfx: focal.x, sfy: focal.y, overflowX, overflowY, moved: false };
    try { containerRef.current.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    e.preventDefault();
  };
  const onPointerMove = (e) => {
    const p = panRef.current;
    if (!p) return;
    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;
    if (!p.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
    p.moved = true;
    if (p.overflowX >= 1) p.fx = clamp(p.sfx - (dx / p.overflowX) * 100, 0, 100);
    if (p.overflowY >= 1) p.fy = clamp(p.sfy - (dy / p.overflowY) * 100, 0, 100);
    if (imgRef.current) imgRef.current.style.objectPosition = `${p.fx}% ${p.fy}%`;
  };
  const endPan = (e) => {
    const p = panRef.current;
    panRef.current = null;
    if (!p) return;
    try { containerRef.current?.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    if (p.moved) images.setFocal(seed, { x: Math.round(p.fx), y: Math.round(p.fy) });
  };
  const onDoubleClick = () => { if (canFocal) images.setFocal(seed, { x: 50, y: 50 }); };

  const dropHandlers = canDrop ? { onDragOver, onDragLeave, onDrop } : {};
  const dropHint = dropping ? <div className="pv-drop"><span>Drop to replace</span></div> : null;
  const dropClass = dropping ? 'is-drop' : '';

  if (photo) {
    return (
      <div
        ref={containerRef}
        className={`viz pv-photo ${className} ${dropClass} ${canFocal ? 'is-adjustable' : ''}`}
        {...dropHandlers}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onDoubleClick={onDoubleClick}
        role="img"
        aria-label={label || photo.name || 'photo'}
      >
        <img ref={imgRef} src={photo.url} alt="" loading="lazy" draggable="false" style={{ objectPosition: `${focal.x}% ${focal.y}%` }} />
        {images.tint && <div className="pv-photo-tint" />}
        {canFocal && <span className="pv-focal-badge"><Move size={11} strokeWidth={2.25} /> Reframe</span>}
        {dropHint}
      </div>
    );
  }

  const { background, inner } = buildVisual({ kind, seed, theme });
  return (
    <div className={`viz ${className} ${dropClass}`} style={{ background }} {...dropHandlers} role="img" aria-label={label || `${kind} visual`}>
      {inner}
      {dropHint}
    </div>
  );
}
