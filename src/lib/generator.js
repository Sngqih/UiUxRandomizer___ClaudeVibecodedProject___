// The theme generator. Produces a full theme object (colors, background,
// typography, icons, shape) from either the harmonious spec or a style preset.
import { hslToHex, contrast, readableOn, mix, rgba } from './color.js';
import { randInt, pick, pickN, chance, snap } from './util.js';
import { FONT_PAIRS } from './fonts.js';
import { ICON_POOL } from './icons.js';
import { HARMONIOUS, PRESETS } from './presets.js';
import { buildLayout } from './layout.js';

const ADJECTIVES = ['Cosmic', 'Velvet', 'Electric', 'Quiet', 'Golden', 'Midnight', 'Coral', 'Arctic', 'Lunar', 'Ember', 'Sage', 'Neon', 'Dusty', 'Crystal', 'Wild', 'Solar', 'Mellow', 'Bold', 'Frosted', 'Vivid'];
const NOUNS = ['Harbor', 'Meadow', 'Circuit', 'Orchid', 'Canyon', 'Tide', 'Aurora', 'Quartz', 'Drift', 'Bloom', 'Signal', 'Grove', 'Prism', 'Haze', 'Summit', 'Lagoon', 'Nova', 'Field', 'Pulse', 'Echo'];

function harmonyOffsets(harmony) {
  switch (harmony) {
    case 'monochromatic':
      return { secondary: 0, accent: 0, mono: true };
    case 'analogous':
      return { secondary: pick([30, -30]), accent: pick([60, -60]) };
    case 'complementary':
      return { secondary: 180, accent: 180 };
    case 'split':
      return { secondary: 150, accent: 210 };
    case 'triadic':
      return { secondary: 120, accent: 240 };
    case 'tetradic':
      return { secondary: 90, accent: 180 };
    default:
      return { secondary: 30, accent: 180 };
  }
}

function resolveAppearance(spec) {
  return spec.appearance === 'either' ? (chance(0.5) ? 'light' : 'dark') : spec.appearance;
}

// Nudge a foreground color until it clears a contrast target against bg.
function ensureContrast(fg, bg, target, towardDark) {
  let out = fg;
  let guard = 0;
  while (contrast(out, bg) < target && guard < 24) {
    out = mix(out, towardDark ? '#000000' : '#ffffff', 0.08);
    guard += 1;
  }
  return out;
}

function buildColors({ spec, appearance, harmony, baseHue }) {
  const isDark = appearance === 'dark';
  const off = harmonyOffsets(harmony);

  const primarySat = randInt(spec.primarySat[0], spec.primarySat[1]);
  const primaryLight = isDark ? randInt(56, 66) : randInt(42, 52);
  const primary = hslToHex(baseHue, primarySat, primaryLight);

  const secondarySat = Math.max(28, primarySat + randInt(-14, 6));
  const secondary = hslToHex(baseHue + off.secondary, secondarySat, primaryLight + (off.mono ? (isDark ? 12 : -10) : 0));

  const accentSat = randInt(spec.accentSat[0], spec.accentSat[1]);
  const accentLight = isDark ? randInt(58, 70) : randInt(46, 58);
  const accent = hslToHex(baseHue + off.accent, accentSat, accentLight + (off.mono ? randInt(-8, 8) : 0));

  // Neutrals carry a faint tint of the base hue so the UI feels cohesive.
  const nSat = randInt(spec.neutralSat[0], spec.neutralSat[1]);
  const background = isDark
    ? hslToHex(baseHue, nSat, randInt(7, 12))
    : hslToHex(baseHue, Math.min(nSat, 16), randInt(96, 99));
  const surface = isDark
    ? hslToHex(baseHue, nSat, randInt(14, 18))
    : hslToHex(baseHue, Math.min(nSat, 12), 100);
  const surfaceAlt = isDark
    ? hslToHex(baseHue, nSat, randInt(19, 24))
    : hslToHex(baseHue, Math.min(nSat, 14), randInt(93, 96));
  const border = isDark
    ? hslToHex(baseHue, nSat, randInt(26, 32))
    : hslToHex(baseHue, Math.min(nSat, 16), randInt(85, 90));

  let text = isDark ? hslToHex(baseHue, Math.min(nSat, 18), 96) : hslToHex(baseHue, Math.min(nSat, 24), 13);
  text = ensureContrast(text, surface, 7, !isDark);
  let textMuted = isDark ? hslToHex(baseHue, Math.min(nSat, 16), 66) : hslToHex(baseHue, Math.min(nSat, 18), 44);
  textMuted = ensureContrast(textMuted, surface, 4.5, !isDark);

  const semantic = (hue) => {
    const s = randInt(62, 78);
    const l = isDark ? 58 : 46;
    return ensureContrast(hslToHex(hue + randInt(-6, 6), s, l), surface, 3, !isDark);
  };

  return {
    background,
    surface,
    surfaceAlt,
    border,
    text,
    textMuted,
    primary,
    primaryContrast: readableOn(primary),
    secondary,
    secondaryContrast: readableOn(secondary),
    accent,
    accentContrast: readableOn(accent),
    success: semantic(142),
    warning: semantic(40),
    danger: semantic(2),
  };
}

function buildBackground({ spec, appearance, colors }) {
  const type = pick(spec.backgrounds);
  const bg = colors.background;
  switch (type) {
    case 'linear': {
      const ang = pick([135, 160, 200, 45, 180, 120]);
      const tint = mix(bg, pick([colors.primary, colors.secondary, colors.accent]), appearance === 'dark' ? 0.16 : 0.1);
      return { type, label: 'Linear gradient', value: `linear-gradient(${ang}deg, ${bg}, ${tint})` };
    }
    case 'radial': {
      const tint = mix(bg, pick([colors.primary, colors.secondary, colors.accent]), appearance === 'dark' ? 0.2 : 0.12);
      const pos = pick(['30% 20%', '80% 0%', '50% 0%', '20% 80%']);
      return { type, label: 'Radial gradient', value: `radial-gradient(120% 120% at ${pos}, ${tint}, ${bg} 62%)` };
    }
    case 'mesh': {
      const a = rgba(colors.primary, appearance === 'dark' ? 0.26 : 0.16);
      const b = rgba(colors.secondary, appearance === 'dark' ? 0.22 : 0.14);
      const c = rgba(colors.accent, appearance === 'dark' ? 0.2 : 0.13);
      return {
        type,
        label: 'Mesh gradient',
        value:
          `radial-gradient(at 16% 20%, ${a}, transparent 46%), ` +
          `radial-gradient(at 84% 16%, ${b}, transparent 42%), ` +
          `radial-gradient(at 64% 82%, ${c}, transparent 46%), ${bg}`,
      };
    }
    case 'dots': {
      const dot = rgba(colors.border, appearance === 'dark' ? 1 : 0.9);
      return { type, label: 'Dot grid', value: `radial-gradient(${dot} 1.3px, transparent 1.3px) 0 0 / 22px 22px, ${bg}` };
    }
    case 'grid': {
      const line = rgba(colors.border, appearance === 'dark' ? 0.8 : 0.6);
      return {
        type,
        label: 'Line grid',
        value:
          `linear-gradient(${line} 1px, transparent 1px) 0 0 / 28px 28px, ` +
          `linear-gradient(90deg, ${line} 1px, transparent 1px) 0 0 / 28px 28px, ${bg}`,
      };
    }
    default:
      return { type: 'solid', label: 'Solid', value: bg };
  }
}

const EXPRESSIVE_VIBES = ['condensed', 'display', 'statement', 'poster', 'grotesque', 'bold'];
const CREATIVE_VIBES = ['display', 'statement', 'editorial', 'magazine', 'condensed', 'grotesque', 'experimental', 'slab'];
const CREATIVE_ARCHETYPES = ['editorial', 'poster'];

function buildTypography(spec, archetype) {
  let pool = spec.fontVibes
    ? FONT_PAIRS.filter((p) => p.vibes.some((v) => spec.fontVibes.includes(v)))
    : FONT_PAIRS;

  // Creative archetypes lean into display / editorial faces.
  const creative = CREATIVE_ARCHETYPES.includes(archetype);
  if (creative) {
    const narrowed = pool.filter((p) => p.vibes.some((v) => CREATIVE_VIBES.includes(v)));
    if (narrowed.length) pool = narrowed;
  }
  const pair = pick(pool.length ? pool : FONT_PAIRS);

  // Treatment adds creative range beyond the family: caps + letter-spacing.
  const expressive = pair.vibes.some((v) => EXPRESSIVE_VIBES.includes(v));
  const upper = chance((creative ? 0.3 : 0.12) + (expressive ? 0.25 : 0));
  const tracking = upper
    ? pick(['0.04em', '0.08em', '-0.005em'])
    : pick(['-0.035em', '-0.025em', '-0.015em', '0em']);

  return {
    pairId: pair.id,
    heading: { family: pair.h[0], fallback: pair.h[1], stack: `'${pair.h[0]}', ${pair.h[1]}`, weights: pair.hw },
    body: { family: pair.b[0], fallback: pair.b[1], stack: `'${pair.b[0]}', ${pair.b[1]}`, weights: pair.bw },
    treatment: { case: upper ? 'uppercase' : 'none', tracking },
    vibes: pair.vibes,
  };
}

function buildIcons(spec) {
  return {
    library: 'lucide',
    strokeWidth: pick(spec.stroke),
    sample: pickN(ICON_POOL, 12).map((i) => i.name),
  };
}

function buildShape(spec) {
  return { radius: snap(randInt(spec.radius[0], spec.radius[1]), 2) };
}

// Generate a theme. `locks` keeps a section's previous value when regenerating:
// { colors, background, fonts, icons, layout } (colors also locks corner radius).
export function generateTheme({ mode = 'harmonious', presetKey = null, archetypeKey = 'random', locks = {}, previous = null } = {}) {
  const spec = mode === 'preset' && presetKey ? PRESETS[presetKey] : HARMONIOUS;
  const appearance = previous && (locks.colors || locks.background) ? previous.appearance : resolveAppearance(spec);
  const harmony = pick(spec.harmonies);
  const baseHue = randInt(0, 359);

  const colors = locks.colors && previous ? previous.colors : buildColors({ spec, appearance, harmony, baseHue });
  const background = locks.background && previous ? previous.background : buildBackground({ spec, appearance, colors });
  const layout = locks.layout && previous ? previous.layout : buildLayout({ archetypeKey });
  const typography = locks.fonts && previous ? previous.typography : buildTypography(spec, layout.archetype);
  const icons = locks.icons && previous ? previous.icons : buildIcons(spec);
  const shape = locks.colors && previous ? previous.shape : buildShape(spec);

  return {
    name: `${pick(ADJECTIVES)} ${pick(NOUNS)}`,
    appearance,
    meta: {
      mode,
      preset: mode === 'preset' ? presetKey : null,
      archetype: layout.archetype,
      harmony: locks.colors && previous ? previous.meta.harmony : harmony,
      baseHue: locks.colors && previous ? previous.meta.baseHue : baseHue,
      generatedAt: new Date().toISOString(),
    },
    colors,
    background,
    typography,
    icons,
    shape,
    layout,
  };
}
