import { useCallback, useEffect, useRef, useState } from 'react';
import Controls from './components/Controls.jsx';
import ImageControls from './components/ImageControls.jsx';
import Preview from './components/Preview.jsx';
import Inspector from './components/Inspector.jsx';
import { generateTheme } from './lib/generator.js';
import { useCopy } from './hooks/useCopy.js';
import { usePhotoLibrary } from './hooks/usePhotoLibrary.js';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('harmonious');
  const [presetKey, setPresetKey] = useState('neon');
  const [archetypeKey, setArchetypeKey] = useState('random');
  const [locks, setLocks] = useState({ layout: false, colors: false, background: false, fonts: false, icons: false });
  const [theme, setTheme] = useState(() => generateTheme({ mode: 'harmonious' }));

  // Image source: 'visuals' | 'photos' | 'mix', palette-tint toggle, and per-slot
  // overrides (slot seed -> photo id) set by dragging an image onto an area.
  const [imageMode, setImageMode] = useState('visuals');
  const [photoTint, setPhotoTint] = useState(false);
  const [overrides, setOverrides] = useState({});
  const [focals, setFocals] = useState({});
  const library = usePhotoLibrary();

  // On first load, if the project folder already has photos, start in Mix.
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (library.folderCount > 0) setImageMode('mix');
  }, [library.folderCount]);

  const setOverride = useCallback((seed, photoId) => {
    setOverrides((o) => ({ ...o, [seed]: photoId }));
    // Replacing the image in a slot resets its framing to center.
    setFocals((f) => {
      if (!(seed in f)) return f;
      const next = { ...f };
      delete next[seed];
      return next;
    });
  }, []);

  const setFocal = useCallback((seed, point) => {
    setFocals((f) => ({ ...f, [seed]: point }));
  }, []);

  // Keep the latest values available to the keyboard handler.
  const latest = useRef({ mode, presetKey, archetypeKey, locks, theme });
  latest.current = { mode, presetKey, archetypeKey, locks, theme };

  const { copied, copy } = useCopy();

  const regenerate = useCallback((overridesIn = {}) => {
    const { mode: m, presetKey: p, archetypeKey: a, locks: l, theme: prev } = latest.current;
    setTheme(generateTheme({ mode: m, presetKey: p, archetypeKey: a, locks: l, previous: prev, ...overridesIn }));
    // A re-rolled layout has new slot seeds, so per-slot overrides/focals no longer apply.
    if (!l.layout) { setOverrides({}); setFocals({}); }
  }, []);

  const toggleLock = useCallback((key) => {
    setLocks((l) => ({ ...l, [key]: !l[key] }));
  }, []);

  const onSetMode = (m) => { setMode(m); regenerate({ mode: m }); };
  const onSetPreset = (p) => { setPresetKey(p); setMode('preset'); regenerate({ mode: 'preset', presetKey: p }); };
  const onSetArchetype = (a) => { setArchetypeKey(a); regenerate({ archetypeKey: a }); };

  // Spacebar = generate (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== 'Space') return;
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return;
      e.preventDefault();
      regenerate();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [regenerate]);

  // Prevent the browser from navigating to an image dropped outside a slot.
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    window.addEventListener('dragover', prevent);
    window.addEventListener('drop', prevent);
    return () => {
      window.removeEventListener('dragover', prevent);
      window.removeEventListener('drop', prevent);
    };
  }, []);

  const images = {
    mode: imageMode,
    photos: library.photos,
    tint: photoTint,
    overrides,
    setOverride,
    focals,
    setFocal,
    addFiles: library.add,
  };

  return (
    <div className="app">
      <Controls
        mode={mode}
        setMode={onSetMode}
        presetKey={presetKey}
        setPresetKey={onSetPreset}
        archetypeKey={archetypeKey}
        setArchetype={onSetArchetype}
        locks={locks}
        toggleLock={toggleLock}
        onGenerate={() => regenerate()}
        theme={theme}
        imageControls={
          <ImageControls
            mode={imageMode}
            setMode={setImageMode}
            tint={photoTint}
            setTint={setPhotoTint}
            library={library}
          />
        }
      />
      <main className="stage">
        <Preview theme={theme} images={images} />
      </main>
      <Inspector theme={theme} copied={copied} copy={copy} />
    </div>
  );
}
