import { mulberry32 } from '../lib/util.js';
import { rgba } from '../lib/color.js';

// Computes a themed abstract visual (or chart) from the palette: returns the
// container background plus the inner SVG/markup. Split out from the component so
// Picture can render the same visual inside its own drop-target container.
// Decorative kinds: gradient, mesh, blob, shapes, rings, waves. Charts: bars, area, donut.
export function buildVisual({ kind = 'gradient', seed = 1, theme }) {
  const c = theme.colors;
  const r = mulberry32(seed);
  const a = c.primary;
  const b = c.secondary;
  const d = c.accent;

  let inner = null;
  let background;

  switch (kind) {
    case 'mesh':
      background =
        `radial-gradient(at ${20 + r() * 20}% ${15 + r() * 20}%, ${rgba(a, 0.85)}, transparent 50%), ` +
        `radial-gradient(at ${70 + r() * 20}% ${10 + r() * 25}%, ${rgba(b, 0.8)}, transparent 48%), ` +
        `radial-gradient(at ${40 + r() * 30}% ${70 + r() * 20}%, ${rgba(d, 0.8)}, transparent 50%), ${c.surfaceAlt}`;
      break;

    case 'gradient': {
      const ang = Math.floor(r() * 360);
      background = `linear-gradient(${ang}deg, ${a}, ${d})`;
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx={20 + r() * 60} cy={20 + r() * 60} r={18 + r() * 22} fill={rgba(b, 0.45)} />
        </svg>
      );
      break;
    }

    case 'blob': {
      background = c.surfaceAlt;
      const blob = (cx, cy, scale) => {
        const n = 7;
        const pts = Array.from({ length: n }, (_, i) => {
          const ang = (i / n) * Math.PI * 2;
          const rad = scale * (0.62 + r() * 0.5);
          return { x: cx + Math.cos(ang) * rad, y: cy + Math.sin(ang) * rad };
        });
        return smoothPath(pts);
      };
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`bl-${seed}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={d} />
            </linearGradient>
          </defs>
          <path d={blob(58, 46, 40)} fill={rgba(b, 0.5)} />
          <path d={blob(42, 56, 34)} fill={`url(#bl-${seed})`} />
        </svg>
      );
      break;
    }

    case 'shapes': {
      background = c.surfaceAlt;
      const cols = [a, b, d];
      const shapes = Array.from({ length: 5 }, (_, i) => {
        const t = r();
        const x = 8 + r() * 80;
        const y = 8 + r() * 80;
        const s = 10 + r() * 26;
        const fill = rgba(cols[i % 3], 0.85);
        if (t < 0.34) return <circle key={i} cx={x} cy={y} r={s / 2} fill={fill} />;
        if (t < 0.67)
          return <rect key={i} x={x} y={y} width={s} height={s} rx={s * 0.18} fill={fill} transform={`rotate(${r() * 40 - 20} ${x} ${y})`} />;
        return <path key={i} d={`M ${x} ${y} L ${x + s} ${y} L ${x + s / 2} ${y - s} Z`} fill={fill} />;
      });
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {shapes}
        </svg>
      );
      break;
    }

    case 'rings': {
      background = `linear-gradient(135deg, ${rgba(a, 0.16)}, ${c.surfaceAlt})`;
      const cx = 30 + r() * 40;
      const cy = 30 + r() * 40;
      const cols = [a, b, d, a];
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {[42, 32, 22, 12].map((rad, i) => (
            <circle key={rad} cx={cx} cy={cy} r={rad} fill="none" stroke={rgba(cols[i], 0.8)} strokeWidth={2.4} />
          ))}
          <circle cx={cx} cy={cy} r={5} fill={d} />
        </svg>
      );
      break;
    }

    case 'waves': {
      background = c.surfaceAlt;
      const wave = (yBase) => {
        const a1 = yBase + r() * 10;
        return `M 0 ${a1} C 30 ${a1 - 16}, 70 ${a1 + 16}, 100 ${a1} L 100 100 L 0 100 Z`;
      };
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={wave(40)} fill={rgba(d, 0.45)} />
          <path d={wave(58)} fill={rgba(b, 0.6)} />
          <path d={wave(74)} fill={a} />
        </svg>
      );
      break;
    }

    case 'bars': {
      background = 'transparent';
      const n = 7;
      const bars = Array.from({ length: n }, (_, i) => {
        const h = 18 + r() * 60;
        const x = 6 + i * (88 / n);
        const w = 88 / n - 3;
        return <rect key={i} x={x} y={80 - h} width={w} height={h} rx={1.5} fill={i % 3 === 1 ? d : a} opacity={0.55 + (i / n) * 0.45} />;
      });
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
          {bars}
        </svg>
      );
      break;
    }

    case 'area': {
      background = 'transparent';
      const n = 7;
      const pts = Array.from({ length: n }, (_, i) => ({ x: (i / (n - 1)) * 100, y: 20 + r() * 45 }));
      const line = pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`ar-${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={rgba(a, 0.5)} />
              <stop offset="100%" stopColor={rgba(a, 0.02)} />
            </linearGradient>
          </defs>
          <path d={`${line} L 100 80 L 0 80 Z`} fill={`url(#ar-${seed})`} />
          <path d={line} fill="none" stroke={a} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
      );
      break;
    }

    case 'donut': {
      background = 'transparent';
      const segs = [0.45, 0.3, 0.25];
      const cols = [a, d, b];
      const R = 30;
      const circ = 2 * Math.PI * R;
      let offset = 0;
      inner = (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g transform="rotate(-90 50 50)">
            {segs.map((frac, i) => {
              const dash = `${frac * circ} ${circ}`;
              const el = (
                <circle key={i} cx="50" cy="50" r={R} fill="none" stroke={cols[i]} strokeWidth={14} strokeDasharray={dash} strokeDashoffset={-offset} />
              );
              offset += frac * circ;
              return el;
            })}
          </g>
        </svg>
      );
      break;
    }

    default:
      background = `linear-gradient(135deg, ${a}, ${d})`;
  }

  return { background, inner };
}

// Standalone visual (used for charts, which are never drop targets).
export default function Visual({ kind = 'gradient', seed = 1, theme, className = '', label }) {
  const { background, inner } = buildVisual({ kind, seed, theme });
  return (
    <div className={`viz ${className}`} style={{ background }} role="img" aria-label={label || `${kind} visual`}>
      {inner}
    </div>
  );
}

function smoothPath(pts) {
  const last = pts[pts.length - 1];
  let dStr = `M ${((pts[0].x + last.x) / 2).toFixed(1)} ${((pts[0].y + last.y) / 2).toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i];
    const next = pts[(i + 1) % pts.length];
    const midX = (cur.x + next.x) / 2;
    const midY = (cur.y + next.y) / 2;
    dStr += ` Q ${cur.x.toFixed(1)} ${cur.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }
  return `${dStr} Z`;
}
