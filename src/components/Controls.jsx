import { Shuffle, Lock, Unlock, Palette, Image as ImageIcon, Type, Shapes, LayoutGrid } from 'lucide-react';
import { PRESET_LIST } from '../lib/presets.js';
import { ARCHETYPE_LIST } from '../lib/layout.js';

const LOCK_ITEMS = [
  { key: 'layout', label: 'Layout & structure', Icon: LayoutGrid },
  { key: 'colors', label: 'Colors & shape', Icon: Palette },
  { key: 'background', label: 'Background', Icon: ImageIcon },
  { key: 'fonts', label: 'Typography', Icon: Type },
  { key: 'icons', label: 'Icons', Icon: Shapes },
];

const ARCHETYPE_OPTIONS = [{ key: 'random', label: 'Surprise me' }, ...ARCHETYPE_LIST];

export default function Controls({
  mode, setMode, presetKey, setPresetKey, archetypeKey, setArchetype, locks, toggleLock, onGenerate, theme, imageControls,
}) {
  return (
    <aside className="rail">
      <div className="rail-head">
        <div className="rail-title">
          <span className="rail-dot" />
          Theme Randomizer
        </div>
        <p className="rail-sub">Generate layouts, backgrounds, palettes, fonts &amp; icons.</p>
      </div>

      <div className="rail-section">
        <span className="rail-legend">Page type</span>
        <div className="chips">
          {ARCHETYPE_OPTIONS.map((a) => (
            <button
              key={a.key}
              className={`chip ${archetypeKey === a.key ? 'is-on' : ''}`}
              onClick={() => setArchetype(a.key)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rail-section">
        <span className="rail-legend">Color mode</span>
        <div className="seg">
          <button className={`seg-btn ${mode === 'harmonious' ? 'is-on' : ''}`} onClick={() => setMode('harmonious')}>
            Harmonious
          </button>
          <button className={`seg-btn ${mode === 'preset' ? 'is-on' : ''}`} onClick={() => setMode('preset')}>
            Style preset
          </button>
        </div>
        <p className="rail-hint">
          {mode === 'harmonious'
            ? 'Color-theory driven. Always balanced and readable.'
            : 'Random within a chosen vibe.'}
        </p>
      </div>

      {mode === 'preset' && (
        <div className="rail-section">
          <span className="rail-legend">Preset</span>
          <div className="chips">
            {PRESET_LIST.map((p) => (
              <button
                key={p.key}
                className={`chip ${presetKey === p.key ? 'is-on' : ''}`}
                onClick={() => setPresetKey(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {imageControls}

      <button className="generate" onClick={onGenerate}>
        <Shuffle size={18} strokeWidth={2} />
        Generate
        <kbd className="generate-kbd">Space</kbd>
      </button>

      <div className="rail-section">
        <span className="rail-legend">Lock while generating</span>
        <div className="locks">
          {LOCK_ITEMS.map(({ key, label, Icon }) => {
            const on = !!locks[key];
            return (
              <button key={key} className={`lock ${on ? 'is-locked' : ''}`} onClick={() => toggleLock(key)}>
                <Icon size={15} strokeWidth={1.75} className="lock-kind" />
                <span className="lock-label">{label}</span>
                {on ? <Lock size={14} strokeWidth={2} /> : <Unlock size={14} strokeWidth={1.75} />}
              </button>
            );
          })}
        </div>
      </div>

      {theme && (
        <div className="rail-meta">
          <div className="rail-meta-row">
            <span>Theme</span>
            <strong>{theme.name}</strong>
          </div>
          <div className="rail-meta-row">
            <span>Page</span>
            <strong className="cap">{theme.layout.archetype} · {theme.layout.shell}</strong>
          </div>
          <div className="rail-meta-row">
            <span>Appearance</span>
            <strong className="cap">{theme.appearance}</strong>
          </div>
          <div className="rail-meta-row">
            <span>Harmony</span>
            <strong className="cap">{theme.meta.harmony}</strong>
          </div>
        </div>
      )}
    </aside>
  );
}
