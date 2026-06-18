import { useState } from 'react';
import { Copy, Check, Download, Code2 } from 'lucide-react';
import { toJSON } from '../lib/tokens.js';
import { readableOn } from '../lib/color.js';

const SWATCH_KEYS = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['accent', 'Accent'],
  ['background', 'Background'],
  ['surface', 'Surface'],
  ['surfaceAlt', 'Surface alt'],
  ['border', 'Border'],
  ['text', 'Text'],
  ['textMuted', 'Text muted'],
  ['success', 'Success'],
  ['warning', 'Warning'],
  ['danger', 'Danger'],
];

export default function Inspector({ theme, copied, copy }) {
  const [showJson, setShowJson] = useState(false);
  const json = toJSON(theme);

  const downloadJson = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <aside className="inspector">
      <div className="insp-section">
        <div className="insp-head">
          <h2 className="insp-title">Colors</h2>
          <span className="insp-note">click to copy</span>
        </div>
        <div className="swatches">
          {SWATCH_KEYS.map(([key, label]) => {
            const value = theme.colors[key];
            const isCopied = copied === value;
            return (
              <button
                key={key}
                className="swatch"
                style={{ background: value, color: readableOn(value) }}
                onClick={() => copy(value)}
                title={`Copy ${value}`}
              >
                <span className="swatch-label">{label}</span>
                <span className="swatch-hex">
                  {isCopied ? <Check size={13} strokeWidth={2.5} /> : null}
                  {isCopied ? 'Copied' : value.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="insp-section">
        <h2 className="insp-title">Typography</h2>
        <CopyRow label="Heading" value={theme.typography.heading.family} copied={copied} copy={copy} />
        <CopyRow label="Body" value={theme.typography.body.family} copied={copied} copy={copy} />
      </div>

      <div className="insp-section">
        <h2 className="insp-title">Background &amp; shape</h2>
        <CopyRow label={theme.background.label} value={theme.background.value} copied={copied} copy={copy} mono small />
        <div className="kv-grid">
          <div className="kv">
            <span>Radius</span>
            <strong>{theme.shape.radius}px</strong>
          </div>
          <div className="kv">
            <span>Icon stroke</span>
            <strong>{theme.icons.strokeWidth}</strong>
          </div>
        </div>
      </div>

      <div className="insp-section">
        <h2 className="insp-title">Layout</h2>
        <div className="kv-grid">
          <div className="kv">
            <span>Page type</span>
            <strong className="cap">{theme.layout.archetype}</strong>
          </div>
          <div className="kv">
            <span>Shell</span>
            <strong className="cap">{theme.layout.shell}</strong>
          </div>
          <div className="kv">
            <span>Density</span>
            <strong className="cap">{theme.layout.density}</strong>
          </div>
          <div className="kv">
            <span>Cards</span>
            <strong className="cap">{theme.layout.cardStyle}</strong>
          </div>
        </div>
      </div>

      <div className="insp-section">
        <h2 className="insp-title">Export</h2>
        <div className="export-actions">
          <button className="ibtn ibtn-primary" onClick={() => copy(json, '__json__')}>
            {copied === '__json__' ? <Check size={15} strokeWidth={2.5} /> : <Copy size={15} strokeWidth={2} />}
            {copied === '__json__' ? 'Copied JSON' : 'Copy JSON tokens'}
          </button>
          <div className="export-row">
            <button className="ibtn" onClick={downloadJson}>
              <Download size={15} strokeWidth={2} />
              Download
            </button>
            <button className={`ibtn ${showJson ? 'is-on' : ''}`} onClick={() => setShowJson((s) => !s)}>
              <Code2 size={15} strokeWidth={2} />
              {showJson ? 'Hide' : 'View'}
            </button>
          </div>
        </div>
        {showJson && <pre className="json-view">{json}</pre>}
      </div>
    </aside>
  );
}

function CopyRow({ label, value, copied, copy, mono, small }) {
  const isCopied = copied === value;
  return (
    <button className={`copy-row ${small ? 'is-small' : ''}`} onClick={() => copy(value)} title="Copy">
      <span className="copy-row-label">{label}</span>
      <span className={`copy-row-value ${mono ? 'is-mono' : ''}`}>{value}</span>
      <span className="copy-row-icon">
        {isCopied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={1.75} />}
      </span>
    </button>
  );
}
