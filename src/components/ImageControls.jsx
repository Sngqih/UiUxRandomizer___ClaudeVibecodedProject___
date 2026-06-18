import { useRef, useState } from 'react';
import { Upload, Trash2, X, FolderOpen, ImageOff, MousePointerClick } from 'lucide-react';
import { PHOTO_DND_TYPE } from './Picture.jsx';

const MODES = [
  { key: 'visuals', label: 'Visuals' },
  { key: 'photos', label: 'Photos' },
  { key: 'mix', label: 'Mix' },
];

// Rail section: pick the image source, toggle palette tint, and manage the photo
// library (drag-drop / file picker uploads + folder photos). Library thumbnails
// are draggable onto preview slots.
export default function ImageControls({ mode, setMode, tint, setTint, library }) {
  const { photos, folderCount, uploadCount, add, remove, clear } = library;
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const hasPhotos = photos.length > 0;

  // Adding photos via the panel surfaces them by switching out of Visuals-only.
  const handleAdd = async (files) => {
    const recs = await add(files);
    if (recs?.length && mode === 'visuals') setMode('mix');
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer?.files?.length) handleAdd(e.dataTransfer.files);
  };

  return (
    <div className="rail-section">
      <span className="rail-legend">Images</span>

      <div className="seg seg-3">
        {MODES.map((m) => (
          <button
            key={m.key}
            className={`seg-btn ${mode === m.key ? 'is-on' : ''}`}
            onClick={() => setMode(m.key)}
            disabled={m.key !== 'visuals' && !hasPhotos}
            title={m.key !== 'visuals' && !hasPhotos ? 'Add photos first' : ''}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="rail-hint">
        {mode === 'visuals' && 'Generated abstract visuals from the palette.'}
        {mode === 'photos' && 'Use your photos for every image slot.'}
        {mode === 'mix' && 'Mix your photos with generated visuals.'}
      </p>

      <button className={`lock ${tint ? 'is-locked' : ''}`} onClick={() => setTint(!tint)}>
        <span className="lock-kind">◐</span>
        <span className="lock-label">Tint photos to palette</span>
        <span className="img-toggle">{tint ? 'On' : 'Off'}</span>
      </button>

      <div
        className={`dropzone ${dragging ? 'is-drag' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <Upload size={18} strokeWidth={1.75} />
        <span className="dropzone-main">Drop photos or click to upload</span>
        <span className="dropzone-sub">stored in your browser</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { handleAdd(e.target.files); e.target.value = ''; }}
        />
      </div>

      {hasPhotos ? (
        <>
          <div className="thumbs">
            {photos.map((p) => (
              <div
                key={p.id}
                className="thumb"
                title={`${p.name} — drag onto a preview area`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(PHOTO_DND_TYPE, p.id);
                  e.dataTransfer.effectAllowed = 'copy';
                }}
              >
                <img src={p.url} alt="" draggable={false} />
                {p.source === 'folder' ? (
                  <span className="thumb-badge" title="From project folder"><FolderOpen size={11} strokeWidth={2} /></span>
                ) : (
                  <button className="thumb-remove" onClick={() => remove(p.id)} title="Remove">
                    <X size={12} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="img-foot">
            <span className="rail-hint">{uploadCount} uploaded · {folderCount} in folder</span>
            {uploadCount > 0 && (
              <button className="img-clear" onClick={clear}><Trash2 size={12} strokeWidth={2} /> Clear</button>
            )}
          </div>
        </>
      ) : (
        <div className="img-empty">
          <ImageOff size={16} strokeWidth={1.75} />
          <span>No photos yet. Upload above, or drop files into <code>src/assets/photos/</code>.</span>
        </div>
      )}

      <div className="img-tip">
        <MousePointerClick size={14} strokeWidth={1.75} />
        <span>Drag any image onto a preview area to replace it. Drag a placed photo to reframe it; double-click to re-center.</span>
      </div>
    </div>
  );
}
